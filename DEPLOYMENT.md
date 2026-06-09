# Deployment Guide

Each package/app in this monorepo can be built and hosted independently.

## Architecture

| Service | Package / App | Default URL | Docker port |
|---------|---------------|-------------|-------------|
| Main app | `frontend` | `app.yourdomain.com` | `3000` |
| Appointment | `apps/appointment-host` | `appointment.yourdomain.com` | `3001` |
| Pay Bill | `apps/pay-bill-host` | `pay.yourdomain.com` | `3003` |
| UI remote (MFE) | `packages/ui-mfe` federation build | `ui.yourdomain.com` | `3002` |
| API | `backend` | `api.yourdomain.com` | `5000` |
| Design docs | `packages/ui-mfe` Storybook | `design.yourdomain.com` | `6006` |
| SDK | `packages/sdk` | npm registry (not hosted) | — |

## Quick start — Docker Compose

```bash
# Build and run all services locally
npm run docker:up

# Optional: Storybook docs site
npm run docker:docs
```

| URL | Service |
|-----|---------|
| http://localhost:3000 | Main frontend |
| http://localhost:3001 | Standalone appointment app |
| http://localhost:3003 | Standalone pay bill landing |
| http://localhost:3002 | UI Module Federation remote |
| http://localhost:5000 | Backend API |

## Local development (without Docker)

```bash
npm install

# Terminal 1 — API
npm run dev:backend

# Terminal 2 — main app
npm run dev:frontend

# Terminal 3 — standalone appointment (port 5174)
npm run dev:appointment

# Terminal 4 — standalone pay bill (port 5175)
npm run dev:pay-bill

# Terminal 4 — UI federation remote (port 5001)
npm run dev:federation --workspace @ank-cora/ui-mfe
```

## Environment variables

### Frontend (`frontend/.env`)

```env
VITE_API_URL=/api
VITE_USE_MOCKS=true

# Point Schedule/Book buttons to standalone appointment host
VITE_APPOINTMENT_URL=http://localhost:3001
VITE_PAY_BILL_URL=http://localhost:3003

# Optional: load UI from Module Federation remote instead of workspace bundle
VITE_UI_MFE_REMOTE=http://localhost:3002/remoteEntry.js
```

### Appointment host (`apps/appointment-host/.env`)

```env
VITE_API_URL=/api
VITE_USE_MOCKS=false
```

## Publish SDK to npm

```bash
npm run build:sdk

# From packages/sdk (requires npm login + registry access)
npm publish --workspace @ank-cora/sdk
```

The SDK builds to `packages/sdk/dist/` with TypeScript declarations.

## Build artifacts per package

```bash
npm run build:sdk          # packages/sdk/dist
npm run build:ui-mfe      # packages/ui-mfe/dist (types)
npm run build:federation  # packages/ui-mfe/dist-federation (remoteEntry.js)
npm run build:appointment # apps/appointment-host/dist
npm run build:pay-bill    # apps/pay-bill-host/dist
npm run build             # frontend/dist
npm run build-storybook   # packages/ui-mfe/storybook-static
```

## Production deployment patterns

### 1. Separate hosts (recommended)

Deploy each Docker image to its own service:

- **Vercel / Netlify / S3+CloudFront** — `frontend/dist`, `apps/appointment-host/dist`
- **Railway / ECS / Fly.io** — `backend` container
- **Static CDN** — `packages/ui-mfe/dist-federation` (serve `remoteEntry.js` with CORS)
- **GitHub Pages / S3** — `packages/ui-mfe/storybook-static`

### 2. Integrated vs external appointment

| Mode | Config | Behavior |
|------|--------|----------|
| Integrated | `VITE_APPOINTMENT_URL` unset | Buttons go to `/appointment` in main app |
| External | `VITE_APPOINTMENT_URL=https://appointment.yourdomain.com` | Full redirect to standalone app |

Same pattern for pay bill with `VITE_PAY_BILL_URL` → `/pay-bill` vs external host.

### 3. Module Federation (runtime UI remote)

1. Deploy `ui-mfe-remote` container → `https://ui.yourdomain.com`
2. Set `VITE_UI_MFE_REMOTE=https://ui.yourdomain.com/remoteEntry.js` when building frontend
3. Rebuild and deploy frontend

Default builds still bundle `@ank-cora/ui-mfe` at compile time (no federation required).

## CI/CD example (GitHub Actions)

```yaml
# .github/workflows/deploy.yml (outline)
jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -f backend/Dockerfile -t cora-api .

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          docker build -f frontend/Dockerfile \
            --build-arg VITE_APPOINTMENT_URL=https://appointment.coraphysicaltherapy.com \
            -t cora-app .

  build-appointment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -f apps/appointment-host/Dockerfile -t cora-appointment .
```

Push images to your container registry and deploy to your cloud provider of choice.
