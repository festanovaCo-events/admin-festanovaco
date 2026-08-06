# Mockoon — API mock local

Entorno Mockoon versionado para el admin de Festanova. Sin endpoints demo (`/users`, `/template`, etc.).

## Arranque rápido

1. Instala deps (`npm install`) — incluye `@mockoon/cli`.
2. En una terminal:

```bash
npm run mock:start
```

Escucha en `http://localhost:3000`.

3. En `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

4. Arranca Next en otro puerto:

```bash
npm run dev
```

## Mockoon Desktop

Abre `mock/environment.json` desde Mockoon (File → Open environment) si prefieres la UI. Los cuerpos viven en `mock/<endpoint>/cases/*.json` y se referencian con `bodyType: FILE`.

## Estructura

En Mockoon Desktop verás **una carpeta por endpoint** (mismo nombre que en disco). Cada carpeta contiene la ruta y sus respuestas apuntan a `cases/*.json`.

| Carpeta | Método | Ruta |
|---------|--------|------|
| `auth-login` | POST | `/v1/auth/login` |
| `auth-register` | POST | `/v1/user/create` |
| `event-list` | GET | `/v1/event` |
| `event-get-by-id` | GET | `/v1/event/:eventId` |
| `event-create` | POST | `/v1/event/create` |
| `event-delete` | DELETE | `/v1/event/:eventId` |
| `event-assets` | POST | `/v1/event/:eventId/assets` |
| `event-config` | POST | `/v1/event-config/:eventType/:eventId` |
| `invitation-list` | GET | `/v1/invitation/:eventId` |
| `invitation-upload` | POST | `/v1/invitation/:eventId/upload` |
| `invitation-info` | GET | `/v1/invitation/info/:token` |
| `telemetry-traces` | POST | `/v1/traces` |

Para regenerar fixtures + `environment.json` desde el script:

```bash
node scripts/generate-mockoon.mjs
```

## Casos de error

En Mockoon Desktop, selecciona la respuesta no-default (p. ej. `error-401`) como activa, o usa reglas (login con `password: "wrong"` → 401).
