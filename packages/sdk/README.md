# @ank-cora/sdk

TypeScript SDK for Cora Health — HTTP client, shared types, and API modules for host apps and MFE packages.

## Install

```bash
# monorepo workspace (already linked)
npm install
```

## Usage

```ts
import { createCoraSdk } from '@ank-cora/sdk';

const sdk = createCoraSdk({
  baseUrl: 'http://localhost:5000/api',
  useMocks: true, // mock services/locations until live routes exist
});

// Health (always live)
await sdk.health.check();

// Homepage data (Promise.all)
const home = await sdk.homepage.getHomePageData();

// Appointment clinic search
const clinics = await sdk.appointments.searchClinics({
  therapyType: 'Physical Therapy',
  location: 'New York, NY',
  insurance: 'Aetna',
  seenDoctor: true,
});
```

## Modules

| Module | Methods |
|--------|---------|
| `health` | `check()` |
| `services` | `getServices()`, `getService(id)` |
| `locations` | `getLocations()`, `getLocation(id)`, `getLocationsWithDetails(ids)` |
| `testimonials` | `getTestimonials()` |
| `homepage` | `getHomePageData()` |
| `appointments` | `searchClinics(params)` |
| `client` | Low-level `get` / `post`, `fetchCriticalData`, `fetchResilientData` |

## Config

| Option | Default | Description |
|--------|---------|-------------|
| `baseUrl` | `http://localhost:5000/api` | API base URL |
| `timeout` | `10000` | Request timeout (ms) |
| `retries` | `3` | Retry count on network failure |
| `useMocks` | `true` | Use in-memory mock data for content APIs |
