# Design: colapso de hooks (piloto) + contrato tipado de `useAsyncRequest`

**Fecha:** 2026-08-06  
**Estado:** aprobado en conversación (opción A + alcance C)  
**Repo:** admin-festanovaco

## Problema

1. La matriz `state` / `handler` / `effect` / `data` por feature es ceremonia SOLID: fragmenta un flujo simple en muchos archivos (effects stub, reexports passthrough) sin reducir complejidad.
2. `useAsyncRequest.execute` traga errores y retorna `Promise<void>`. Callers asumen éxito tras `await` (p. ej. delete de eventos quita el item del UI aunque la API falle).

## Objetivos

- Piloto de colapso de hooks en **login** y **event list**, dejando una plantilla clara para el resto.
- Hacer el contrato de `execute` honesto: `Promise<T | null>` y `onSuccess(data: T)`.
- Preservar el comportamiento UX correcto (toasts, redirects) y la API pública hacia las views (`UseLoginReturn`, `UseEventListReturn`).

## No objetivos (fuera de alcance)

- Colapsar register, config, create, guest-list, file-manager, etc.
- Registry por `EventType` / desacoplar dominio wedding.
- Separar side effects de auth en `shared/data/auth/post.ts`.
- Migrar páginas a RSC / server fetch.
- Cambiar el look & feel de las vistas.

## Arquitectura

### Login (`src/features/auth/login/hooks/`)

**Queda**

- `use-login.ts` — form, `showPassword`, `useAsyncRequest`, `onTogglePassword`, `onSubmit`
- `validations/login.schema.ts` — sin cambios de comportamiento

**Se elimina**

- `state/use-login-state.ts`
- `handler/use-login-handler.ts`
- `effect/use-login-effect.ts` (stub vacío)
- `data/login.ts` (passthrough)

**Imports**

- `login` desde `@/shared/data/auth/post`
- `LoginResponse` desde `@/interfaces/api/auth/responses.interface` (o el path canónico actual del tipo)

**API pública**

- Misma forma de retorno hacia la view: `form`, `showPassword`, `isLoading`, `onTogglePassword`, `onSubmit`.

### Event list (`src/features/event/list/hooks/`)

**Queda**

- `use-list.ts` exportando `useEventList` — estado de lista/filtros/sort, fetch inicial, handlers de navegación y delete

**Se elimina**

- `state/use-list-state.ts`
- `handler/use-list-handler.ts`
- `effect/use-list-effect.ts`
- `data/list.ts` (passthrough)

**Imports**

- `listEvents` desde `@/shared/data/event/get`
- `deleteEvent` desde `@/shared/data/event/delete`

**API pública**

- Misma forma de retorno hacia `event-list-view` (campos actuales de `UseEventListReturn`).

### Shared: `useAsyncRequest`

Archivos:

- `src/shared/hooks/use-async-request.ts`
- `src/interfaces/hooks/use-async-request.interface.ts`

Contrato nuevo:

```ts
export interface UseAsyncRequestOptions<T = unknown> {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  initialLoading?: boolean;
}

export interface UseAsyncRequestReturn<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  execute: (requestFn: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}
```

Comportamiento de `execute`:

| Resultado | Acciones | Retorno |
|-----------|----------|---------|
| Éxito | `setData`, toast success opcional, `onSuccess?.(result)` | `result` |
| Fallo | `setError`, toast error opcional, `onError?.(msg)` | `null` (sin rethrow) |

Firma del hook: `useAsyncRequest<T>(options: UseAsyncRequestOptions<T> = {})`.

## Flujo de datos

### Delete (event list)

```ts
const result = await executeDelete(() => deleteEvent(event.id));
if (result === null) return;
setEvents((prev) => prev.filter((e) => e.id !== event.id));
router.refresh();
```

No mutar UI ni refrescar si la petición falló.

### Login / register

- Redirect (u otros side effects de éxito) siguen vía `onSuccess` en las opciones del hook.
- El valor de retorno de `execute` puede ignorarse donde no haga falta.

### Callers fuera del colapso

Adaptar al nuevo tipo de retorno para que compile. Fix mínimo donde el código asume éxito tras `await execute`:

- **event create** (`use-create-handler.ts`): hoy marca el span OpenTelemetry OK aunque `execute` falle → solo `SpanStatusCode.OK` si `result !== null`; en fallo, status de error / no marcar OK.

Otros callers (`config`, `detail` effect, register) que no dependen del retorno para mutar UI fuera del callback pueden ignorar el valor o usarlo si es trivial.

## Testing / verificación

1. Typecheck del proyecto (`tsc` / script de check del repo).
2. Login: éxito → toast + redirect dashboard; fallo → toast error, sin redirect.
3. Event list: delete éxito → evento desaparece; delete fallo → toast, el evento permanece en la lista.

## Criterios de hecho

- [ ] Carpetas state/handler/effect/data eliminadas en login y event list (piloto).
- [ ] Sin barrels nuevos; imports a archivos concretos.
- [ ] `execute` retorna `T | null`; `onSuccess` tipado con `T`.
- [ ] Delete no actualiza UI en fallo.
- [ ] Create no marca span OK en fallo de `execute`.
- [ ] API pública de views de login y event list sin cambios de contrato.
- [ ] Typecheck en verde.
