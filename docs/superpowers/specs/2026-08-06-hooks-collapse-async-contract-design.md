# Design: colapso de hooks (piloto) + contrato tipado de `useAsyncRequest`

**Fecha:** 2026-08-06  
**Estado:** aprobado en conversación (opción A + alcance C); actualizado con auditoría cross-feature y alineación SOLID  
**Repo:** admin-festanovaco

## Problema

1. La matriz `state` / `handler` / `effect` / `data` por feature es **ceremonia SOLID**, no SOLID real: fragmenta un flujo simple en muchos archivos (effects stub, reexports passthrough) sin reducir complejidad ni aislar razones de cambio.
2. `useAsyncRequest.execute` traga errores y retorna `Promise<void>`. Callers asumen éxito tras `await` (p. ej. delete de eventos quita el item del UI aunque la API falle) — contrato de comportamiento mentiroso (LSP / honestidad de API).

## Principios SOLID (criterio de diseño)

El patrón objetivo no es “un archivo siempre”, sino **responsabilidades reales**, no carpetas por plantilla.

| Principio | Anti-patrón actual | Objetivo |
|-----------|-------------------|----------|
| **SRP** | Un feature partido en 4–5 archivos que cambian juntos (form + toggle + submit). Effects vacíos y `data/` de 1–4 líneas no son responsabilidades. | Un hook de feature coheciona el flujo UI. Extraer solo cuando exista un motivo de cambio distinto (wizard steps, upload de assets, agregación API, catálogo de templates). |
| **OCP** | Extender = copiar la matriz state/handler/effect/data. | Extender añadiendo módulos de dominio (`shared/data`, helpers, sub-hooks con propósito) sin repetir la plantilla 4-vías. |
| **LSP** | `await execute(...)` sugiere éxito; el caller muta UI aunque falló. | `execute` → `Promise<T \| null>`; side effects de UI solo si `result !== null` (o vía `onSuccess`). |
| **ISP** | Handlers reciben `Pick<>` enormes de setters del state (“interfaz gorda de mutadores”). | El hook expone a la view solo lo que la view usa; sin pasar setters internos entre capas inventadas. |
| **DIP** | Features dependen de wrappers locales (`hooks/data/*`) que reexportan `@/shared/data`. | Features dependen de la capa canónica `@/shared/data/...` (o de un módulo de dominio real si hay lógica, no de un passthrough). |

### Cuándo sí partir (SRP real)

Separar **solo** si el trozo tiene una razón de cambio propia:

- Wizard / steps (`use-config-steps`)
- Uploads de assets con estado propio
- Agregación API no trivial (`guest-list/list` data)
- Catálogo/temas locales (`template-email` templates)
- Helpers puros (formatters, `format-register-data`, music preview)

**No** separar por convención `state` / `handler` / `effect` / `data`.

### Deprecación del patrón 4-carpetas

Tras auditoría de todas las features, el patrón **queda deprecado** como estándar. No se deja como arquitectura a preservar; el piloto define la plantilla de migración.

| Feature | Veredicto | Notas SOLID |
|---------|-----------|-------------|
| auth/login | **COLLAPSE** (piloto) | SRP: un flujo form; effect stub; data passthrough |
| event/list | **COLLAPSE** (piloto) | Filter/sort + nav caben en un hook; fix LSP en delete |
| auth/register | **COLLAPSE** | Igual que login; keep `format-register-data` si aporta |
| auth/forgot-password | **COLLAPSE** | Ceremonia pura (stub API local) |
| event/create | **COLLAPSE** | OTEL no justifica 4 capas; fix LSP en span OK |
| event/detail | **COLLAPSE** | Opcional keep `use-music-preview` (concern puro) |
| file-manager/list | **COLLAPSE** | Un `router.push` |
| file-manager/detail | **COLLAPSE** | ~140 LOC; effect muerto |
| analytics/dashboard | **COLLAPSE** | Placeholder |
| guest-list/list | **PARTIAL** | Collapse hooks; **keep** `data/list.ts` (agregación = SRP/DIP) |
| template-email/editor | **PARTIAL** | Collapse hooks; **keep** `templates.ts` |
| guest-list/detail | **PARTIAL** | Collapse 4-vías; keep lógica expand/paginación como módulo interno |
| event/config | **PARTIAL** | **Keep** steps, uploads, `data/config.ts`; collapse effect/handler glue. Revisar `use-music-upload` huérfano |

### Oleadas de migración (post-piloto)

| Oleada | Features | Acción |
|--------|----------|--------|
| **0 (este PR)** | login, event/list + contrato `useAsyncRequest` | COLLAPSE + LSP en `execute` |
| **1** | register, forgot-password, create, event/detail, file-manager/*, analytics | COLLAPSE |
| **2** | guest-list/list, template-email/editor | PARTIAL (conservar data útil) |
| **3** | event/config, guest-list/detail | PARTIAL con más cuidado |

Las oleadas 1–3 **no** entran en el alcance de implementación de este PR; quedan documentadas para PRs siguientes.

## Objetivos (PR actual)

- Piloto de colapso en **login** y **event list** (plantilla SOLID para el resto).
- Contrato honesto de `execute`: `Promise<T | null>` y `onSuccess(data: T)`.
- Preservar UX (toasts, redirects) y API pública hacia las views (`UseLoginReturn`, `UseEventListReturn`).
- Documentar deprecación del patrón 4-carpetas y criterios SOLID de extracción.

## No objetivos (fuera de alcance de este PR)

- Ejecutar oleadas 1–3 (register, config, create, guest-list, file-manager, etc.).
- Registry por `EventType` / desacoplar dominio wedding.
- Separar side effects de auth en `shared/data/auth/post.ts`.
- Migrar páginas a RSC / server fetch.
- Cambiar el look & feel de las vistas.

## Arquitectura (piloto)

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
- `LoginResponse` desde `@/interfaces/api/auth/responses.interface` (path canónico del tipo)

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

Alineación SOLID: **LSP** (sustitución honesta del resultado), **ISP** (`onSuccess` tipado con `T`, no `unknown`).

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
- [ ] Sin barrels nuevos; imports a archivos concretos (`@/shared/data/...`).
- [ ] `execute` retorna `T | null`; `onSuccess` tipado con `T`.
- [ ] Delete no actualiza UI en fallo.
- [ ] Create no marca span OK en fallo de `execute`.
- [ ] API pública de views de login y event list sin cambios de contrato.
- [ ] Spec documenta deprecación del patrón 4-carpetas, criterios SOLID de extracción y oleadas 1–3.
- [ ] Typecheck en verde.
