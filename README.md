# project-prep

Monorepo with:
- `frontend/`: React (Vite) host app
- `packages/ui-mfe/`: Shared UI library (`@ank-cora/ui-mfe`)
- `packages/appointment-mfe/`: Appointment booking flow (`@ank-cora/appointment-mfe`)
- `packages/pay-bill-mfe/`: Pay bill landing (`@ank-cora/pay-bill-mfe`)
- `packages/sdk/`: TypeScript API SDK (`@ank-cora/sdk`)
- `backend/`: Node + Express API

## Quickstart

```bash
npm install
npm run dev
```

## Separate deployment

Each app/package can be built and hosted independently. See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for Docker, env vars, Module Federation, and npm publish steps.

```bash
npm run docker:up          # frontend :3000, appointment :3001, ui-mfe :3002, api :5000
npm run dev:appointment    # standalone appointment app (port 5174)
npm run build:federation   # ui-mfe remoteEntry.js for runtime MFE
```

## URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

## Frontend (CORA-style replica)

The React frontend replicates the layout and styling of [CORA Physical Therapy](https://coraphysicaltherapy.com/) using **Tailwind CSS** and reusable components.

### Component structure

```
packages/ui-mfe/src/   # Shared UI (Button, Card, Container, Input, Select, …)
frontend/src/
├── components/
│   ├── ui/          # Re-exports @ank-cora/ui-mfe + app-only (ClinicMap, ImageCarousel)
│   ├── layout/      # Header, Footer, AnnouncementBar, NavDropdown
│   └── sections/    # Hero, PainGrid, LocationFinder, CareerSection, etc.
├── data/            # navigation, pain areas, testimonials, news
└── pages/           # HomePage
```

### UI package (`@ank-cora/ui-mfe`)

Reusable components live in `packages/ui-mfe` and are consumed by the frontend as a workspace dependency:

```tsx
import { Button, Container } from '@ank-cora/ui-mfe';
```

```bash
npm run build:ui-mfe    # build library to dist/ (for publishing)
```

### Appointment package (`@ank-cora/appointment-mfe`)

Booking flow modeled after [appointment.coraphysicaltherapy.com](https://appointment.coraphysicaltherapy.com/). UI primitives are in `@ank-cora/ui-mfe`; the page composes them at `/appointment`.

```tsx
import { AppointmentPage } from '@ank-cora/appointment-mfe';
```

### SDK (`@ank-cora/sdk`)

Typed HTTP client and API modules for services, locations, testimonials, appointments, and health.

```ts
import { createCoraSdk } from '@ank-cora/sdk';

const sdk = createCoraSdk({ baseUrl: '/api', useMocks: false });
await sdk.health.check();
await sdk.appointments.searchClinics({ therapyType, location, insurance, seenDoctor: true });
```

```bash
npm run build:sdk
```

### Storybook

Storybook lives in `packages/ui-mfe` (UI primitives + optional host app stories under `storybook/stories/`). Redux state can be seeded per story via `parameters.redux.preloadedState`.

```bash
npm run storybook          # http://localhost:6006
npm run build-storybook
```

### Redux

State is managed with Redux Toolkit in `frontend/src/store/`:

- `location` — location search form
- `testimonials` — active testimonial index
- `ui` — announcement bar visibility

### Unit tests

```bash
npm run test               # run once
npm run test:watch         # watch mode
npm run test:coverage      # with coverage
```

Tests use Vitest + React Testing Library (`*.test.js` / `*.test.jsx` next to source).
```

# project-prep
