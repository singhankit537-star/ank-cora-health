# @ank-cora/ui-mfe

Shared UI component library for Cora Health. Published as an npm workspace package so the main frontend (and future apps) consume the same components without duplicating source.

## Usage in a host app

```bash
# Already linked via npm workspaces in this monorepo
npm install
npm run build --workspace @ank-cora/ui-mfe
```

```tsx
import { Button, Card, Container } from '@ank-cora/ui-mfe';
```

```ts
// main.tsx — theme tokens for TriangleAccent, etc.
import '@ank-cora/ui-mfe/theme.css';
```

Ensure Tailwind scans the package (host `index.css` or Tailwind `content`):

```css
@source "../../packages/ui-mfe/src/**/*.{ts,tsx}";
```

## Storybook

```bash
npm run storybook              # http://localhost:6006
npm run build-storybook
```

Stories live in `storybook/stories/`. Host-app sections/layout use the `@/` alias to `frontend/src`. See `storybook/README.md`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Type declarations in `dist/` |
| `npm run dev` | Watch TypeScript declarations |
| `npm run storybook` | Component docs dev server |
| `npm run build-storybook` | Static Storybook build |

### Appointment UI components

Exported from `@ank-cora/ui-mfe` for the booking flow:

- `IconInput`, `OrDivider`, `ToggleSwitch`
- `OutlineActionButton`, `SearchSubmitButton`
- `ServiceBadge`, `AppointmentBookingCard`
- Icons: `SearchIcon`, `PinIcon`, `LocateIcon`, `CardIcon`, therapy icons

Composed page: `@ank-cora/appointment-mfe` → `AppointmentPage`

## Why a package instead of runtime Module Federation?

For reusable components inside one org/monorepo, a **workspace package** is the usual best practice: full TypeScript support, one version of React, simpler CI, and no remote-entry runtime coupling. Use [Module Federation](https://module-federation.io/) when multiple independently deployed apps must share UI at runtime without redeploying the host.
