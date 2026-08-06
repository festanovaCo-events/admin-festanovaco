# Hooks Collapse + Async Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deprecar el patrón ceremonial `state/handler/effect/data` en todas las features, tipar `useAsyncRequest.execute` como `Promise<T | null>`, y preservar el contrato público de cada view.

**Architecture:** Un hook de feature por flujo UI; imports directos a `@/shared/data/...` o a módulos de dominio reales (PARTIAL). `execute` retorna `T | null` (LSP). Extraer solo steps/uploads/agregación/templates con SRP real.

**Tech Stack:** Next.js (App Router), React client hooks, react-hook-form + zod, next-intl, axios vía shared/data, OpenTelemetry en create, Biome, TypeScript (`npx tsc --noEmit`).

**Spec:** `docs/superpowers/specs/2026-08-06-hooks-collapse-async-contract-design.md`

---

## File map (resultado esperado)

| Área | Crear/reescribir | Eliminar |
|------|------------------|----------|
| shared | modificar `use-async-request.ts` + interface | — |
| login | `use-login.ts` | state/, handler/, effect/, data/ |
| event/list | `use-list.ts` | state/, handler/, effect/, data/ |
| register | `use-register.ts` | state/, handler/, effect/, data/register.ts (keep format-register-data + validations) |
| forgot-password | `use-forgot-password.ts` | state/, handler/, effect/, data/ |
| event/create | `use-create.ts` | state/, handler/, effect/, data/ |
| event/detail | `use-detail.ts` | state/, handler/, effect/, data/ (keep music-preview opcional) |
| file-manager/list | `use-list.ts` | handler/, effect/ |
| file-manager/detail | `use-detail.ts` | state/, handler/, effect/, data/ |
| analytics | `use-dashboard.ts` | state/, handler/, effect/ |
| guest-list/list | `use-list.ts` | state/, handler/, effect/ (keep data/list.ts); mover `SortOption` si hace falta |
| template-email | `use-editor.ts` | state/, handler/, effect/ (keep data/templates.ts) |
| event/config | `use-config.ts` | effect/, handler/ (keep steps, image-upload, data/config); resolver music-upload |
| guest-list/detail | `use-detail.ts` | state/, handler/, effect/, data/ passthrough |

---

### Task 1: Tipar `useAsyncRequest` (`T | null`)

**Files:**
- Modify: `src/interfaces/hooks/use-async-request.interface.ts`
- Modify: `src/shared/hooks/use-async-request.ts`

- [ ] **Step 1: Actualizar la interface**

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

- [ ] **Step 2: Actualizar la implementación**

En `execute`: tras éxito `return result`; en `catch` tras toast/`onError` `return null` (sin rethrow). Cambiar firma a `useAsyncRequest<T>(options: UseAsyncRequestOptions<T> = {})`.

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: puede fallar en callers que asumen `Promise<void>`; se corrigen en tasks siguientes. Si solo hay errores en features aún no migradas, continuar.

- [ ] **Step 4: Commit**

```bash
git add src/interfaces/hooks/use-async-request.interface.ts src/shared/hooks/use-async-request.ts
git commit -m "$(cat <<'EOF'
fix: make useAsyncRequest execute return T or null

EOF
)"
```

---

### Task 2: Oleada 0 — colapsar login

**Files:**
- Rewrite: `src/features/auth/login/hooks/use-login.ts`
- Keep: `src/features/auth/login/hooks/validations/login.schema.ts`
- Delete: `state/use-login-state.ts`, `handler/use-login-handler.ts`, `effect/use-login-effect.ts`, `data/login.ts`

- [ ] **Step 1: Reescribir `use-login.ts`**

```ts
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginResponse } from "@/interfaces/api/auth/responses.interface";
import { login } from "@/shared/data/auth/post";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useRouter } from "@/shared/i18n/routing";
import {
  createLoginSchema,
  type LoginFormValues,
} from "./validations/login.schema";

export function useLogin() {
  const router = useRouter();
  const tValidation = useTranslations("auth.validation");
  const tSuccess = useTranslations("auth.success");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(tValidation)),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { isLoading, execute } = useAsyncRequest<LoginResponse>({
    initialLoading: false,
    successMessage: tSuccess("login"),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormValues) => {
    await execute(() => login(data));
  };

  return {
    form,
    showPassword,
    isLoading,
    onTogglePassword,
    onSubmit,
  };
}

export type UseLoginReturn = ReturnType<typeof useLogin>;
```

- [ ] **Step 2: Borrar archivos ceremoniales de login**

Delete the four files listed above. Confirm no imports restantes a esas rutas (`rg "login/hooks/(state|handler|effect|data)"`).

- [ ] **Step 3: Commit**

```bash
git add -A src/features/auth/login/hooks
git commit -m "$(cat <<'EOF'
refactor: collapse login hooks into single useLogin

EOF
)"
```

---

### Task 3: Oleada 0 — colapsar event list + fix delete atómico

**Files:**
- Rewrite: `src/features/event/list/hooks/use-list.ts`
- Delete: `state/use-list-state.ts`, `handler/use-list-handler.ts`, `effect/use-list-effect.ts`, `data/list.ts`

- [ ] **Step 1: Reescribir `use-list.ts` con delete atómico**

Fusionar estado (search/sort/events/`useMemo` filter), `useEffect` de `listEvents`, handlers de nav, y:

```ts
const onDelete = async (event: Event) => {
  const result = await executeDelete(() => deleteEvent(event.id));
  if (result === null) return;
  setEvents((prev) => prev.filter((e) => e.id !== event.id));
  router.refresh();
};
```

Imports: `listEvents` desde `@/shared/data/event/get`, `deleteEvent` desde `@/shared/data/event/delete`. Preferir `useRouter` de `@/shared/i18n/routing` si el resto del repo lo usa para paths sin locale manual; si se mantiene `next/navigation` + `useLocale`, preservar el comportamiento actual de paths `/${locale}/dashboard/...`.

Mantener la misma forma de retorno que `UseEventListReturn` actual (incl. `isDeleting`, `filteredAndSortedEvents`, etc.).

En el `switch` de sort, usar `default` con `const _exhaustive: never = sortBy; return _exhaustive` **solo si** `SortOption` es un union cerrado sin default útil; si hoy hay `default: return 0`, dejar exhaustive check alineado a la regla del repo.

- [ ] **Step 2: Borrar ceremoniales y verificar imports**

`rg "event/list/hooks/(state|handler|effect|data)"` → sin matches.

- [ ] **Step 3: Commit**

```bash
git add -A src/features/event/list/hooks
git commit -m "$(cat <<'EOF'
refactor: collapse event list hooks and fix delete atomicity

EOF
)"
```

---

### Task 4: Oleada 1 — auth register + forgot-password

**Files:**
- Rewrite: `src/features/auth/register/hooks/use-register.ts`
- Keep: `validations/`, `data/format-register-data.ts` (mover a `hooks/format-register-data.ts` o dejar path sin carpeta `data/` passthrough; si `data/` solo tenía register.ts + format, eliminar `data/register.ts` y colocar format junto al hook o en `hooks/format-register-data.ts`)
- Rewrite: `src/features/auth/forgot-password/hooks/use-forgot-password.ts`
- Delete: state/handler/effect/(data passthrough) en ambas features

- [ ] **Step 1: Colapsar register**

Mismo patrón que login: form + toggle + `execute(() => register(...))` + `onSuccess` → `/auth/login`. Import `register` desde `@/shared/data/auth/...` (path actual del post/register). Usar `formatRegisterData` desde el módulo keep.

- [ ] **Step 2: Colapsar forgot-password**

Un solo hook con form + submit al stub actual (comportamiento idéntico, incl. `console.log` si es lo que hay hoy).

- [ ] **Step 3: Commit**

```bash
git add -A src/features/auth/register/hooks src/features/auth/forgot-password/hooks
git commit -m "$(cat <<'EOF'
refactor: collapse register and forgot-password hooks

EOF
)"
```

---

### Task 5: Oleada 1 — event create (span OK solo si éxito) + event detail

**Files:**
- Rewrite: `src/features/event/create/hooks/use-create.ts`
- Rewrite: `src/features/event/detail/hooks/use-detail.ts`
- Keep: validations create; opcional `state/use-music-preview.ts` → mover a `hooks/use-music-preview.ts`
- Delete: ceremoniales state/handler/effect/data

- [ ] **Step 1: Colapsar create con LSP en OTEL**

```ts
const result = await execute(async () => {
  /* build CreateEventRequest + createEvent */
  return await createEvent(eventData);
});

if (result === null) {
  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: "createEvent failed",
  });
} else {
  span.setStatus({ code: SpanStatusCode.OK });
}
```

No marcar OK si `result === null`. Import `createEvent` desde `@/shared/data/event/post` (o path canónico actual).

- [ ] **Step 2: Colapsar detail**

Fetch en `useEffect` vía `execute` + `getEventById`; handlers back/preview; keep `use-music-preview` como archivo hermano si se usa.

- [ ] **Step 3: Commit**

```bash
git add -A src/features/event/create/hooks src/features/event/detail/hooks
git commit -m "$(cat <<'EOF'
refactor: collapse create and detail hooks; fix create span status

EOF
)"
```

---

### Task 6: Oleada 1 — file-manager + analytics

**Files:**
- Rewrite: `src/features/file-manager/list/hooks/use-list.ts`
- Rewrite: `src/features/file-manager/detail/hooks/use-detail.ts`
- Rewrite: `src/features/analytics/dashboard/hooks/use-dashboard.ts`
- Delete: ceremoniales

- [ ] **Step 1: file-manager list** — un hook que solo expone `onGoToEventList` (router).

- [ ] **Step 2: file-manager detail** — fusionar upload/delete/download/dialog state en `use-detail.ts`; import upload desde `@/shared/data/...`.

- [ ] **Step 3: analytics** — `return { title: "AnalyticsPage" }` (o el string actual del state); borrar state/handler/effect vacíos.

- [ ] **Step 4: Commit**

```bash
git add -A src/features/file-manager src/features/analytics
git commit -m "$(cat <<'EOF'
refactor: collapse file-manager and analytics hooks

EOF
)"
```

---

### Task 7: Oleada 2 — guest-list/list + template-email (PARTIAL)

**Files:**
- Rewrite: `src/features/guest-list/list/hooks/use-list.ts`
- Keep: `src/features/guest-list/list/hooks/data/list.ts`
- Fix import: `guest-list-view.tsx` importa `SortOption` desde `../hooks/state/use-list-state` → exportar `SortOption` desde `use-list.ts` o un `types.ts` hermano
- Rewrite: `src/features/template-email/editor/hooks/use-editor.ts`
- Keep: `data/templates.ts`
- Delete: state/handler/effect en ambas

- [ ] **Step 1: Colapsar guest-list list** manteniendo `data/list.ts` y `getGuestLists`.

- [ ] **Step 2: Actualizar import de `SortOption` en la view.**

- [ ] **Step 3: Colapsar editor** unificando cambio de categoría (una sola llamada a `pickTemplateByCategory`).

- [ ] **Step 4: Commit**

```bash
git add -A src/features/guest-list/list src/features/template-email
git commit -m "$(cat <<'EOF'
refactor: collapse guest-list list and template-email hooks (partial)

EOF
)"
```

---

### Task 8: Oleada 3 — event/config (PARTIAL)

**Files:**
- Rewrite: `src/features/event/config/hooks/use-config.ts` (absorbe handler + effect)
- Keep: `state/use-config-steps.ts`, `state/use-image-upload.ts`, `data/config.ts` (valorar renombrar carpeta `state/` de steps/uploads a nombres planos bajo `hooks/` sin matriz 4-vías — mínimo: dejar steps/uploads donde están si evita diff enorme; no reintroducir handler/effect)
- Delete: `effect/use-config-effect.ts`, `handler/use-config-handler.ts`
- Resolver: `state/use-music-upload.ts` — si nadie lo importa, **borrar** archivo + interface huérfana si solo se usa ahí

- [ ] **Step 1: Mover lógica de `useConfigHandler` y `useConfigEffect` dentro de `use-config.ts` / state existente.**

- [ ] **Step 2: Borrar effect/handler; borrar music-upload si huérfano.**

- [ ] **Step 3: Commit**

```bash
git add -A src/features/event/config
git commit -m "$(cat <<'EOF'
refactor: collapse event config glue hooks; keep steps and uploads

EOF
)"
```

---

### Task 9: Oleada 3 — guest-list/detail (PARTIAL)

**Files:**
- Rewrite: `src/features/guest-list/detail/hooks/use-detail.ts`
- Delete: state/handler/effect/data passthrough
- Si el archivo supera ~300–400 LOC y la legibilidad cae, extraer `use-guest-expand.ts` o helper puro de paginación/filter — no recrear la matriz 4-carpetas

- [ ] **Step 1: Fusionar en `use-detail.ts` preservando API pública.**

- [ ] **Step 2: Commit**

```bash
git add -A src/features/guest-list/detail
git commit -m "$(cat <<'EOF'
refactor: collapse guest-list detail hooks

EOF
)"
```

---

### Task 10: Verificación final

- [ ] **Step 1: Buscar restos del patrón**

```bash
rg "hooks/(state|handler|effect)/" src/features --glob "*.ts*"
rg "export \{ .* \} from \"@/shared/data" src/features --glob "**/hooks/data/*.ts"
```

Expected: solo keeps PARTIAL (`config` steps/uploads/data, `guest-list/list/data`, `template-email/.../templates`, format-register si aplica). Cero effects stub. Cero reexports de 1 línea salvo data de dominio real.

- [ ] **Step 2: Typecheck + lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: exit 0.

- [ ] **Step 3: Commit de fixes si hiciera falta**

```bash
git commit -m "$(cat <<'EOF'
chore: fix types and lint after hooks collapse

EOF
)"
```

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| `execute` → `T \| null`, `onSuccess(data: T)` | Task 1 |
| Login + event list collapse + delete atómico | Tasks 2–3 |
| Oleada 1 COLLAPSE | Tasks 4–6 |
| Oleada 2 PARTIAL | Task 7 |
| Oleada 3 PARTIAL + music-upload | Tasks 8–9 |
| Create span OK solo si éxito | Task 5 |
| Typecheck verde | Task 10 |
| Sin barrels; imports concretos | Todas |
| API views sin cambio de contrato | Todas (return shape estable) |
