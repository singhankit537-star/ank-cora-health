# project-prep

Monorepo with:
- `frontend/`: React (Vite)
- `backend/`: Node + Express API

## Quickstart

```bash
npm install
npm run dev
```

## URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

## Frontend (CORA-style replica)

The React frontend replicates the layout and styling of [CORA Physical Therapy](https://coraphysicaltherapy.com/) using **Tailwind CSS** and reusable components.

### Component structure

```
frontend/src/
├── components/
│   ├── ui/          # Button, Container, Card, Input, Select, SectionHeading, TriangleAccent
│   ├── layout/      # Header, Footer, AnnouncementBar, NavDropdown
│   └── sections/    # Hero, PainGrid, LocationFinder, CareerSection, etc.
├── data/            # navigation, pain areas, testimonials, news
└── pages/           # HomePage
```

### Storybook

All stories live in `frontend/storybook/stories/` (separate from `src/`). Redux state can be seeded per story via `parameters.redux.preloadedState`.

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
