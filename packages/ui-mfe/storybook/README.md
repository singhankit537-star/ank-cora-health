# Storybook (`@ank-cora/ui-mfe`)

Component documentation for the shared UI package and related host-app compositions.

## Structure

```
storybook/
├── decorators/       # Redux provider, layout wrappers
├── parameters.js     # Shared Storybook parameters
└── stories/
    ├── ui/           # @ank-cora/ui-mfe primitives
    ├── layout/       # Host app layout (imports via `@/`)
    ├── sections/     # Host app sections
    └── pages/        # Full page compositions
```

## Conventions

- UI stories import from `@ank-cora/ui-mfe`.
- Host stories import components via `@/components/...` (alias → `frontend/src`).
- Use `parameters.redux.preloadedState` to seed Redux per story.

## Commands

```bash
npm run storybook --workspace @ank-cora/ui-mfe
npm run build-storybook --workspace @ank-cora/ui-mfe
```

From the repo root: `npm run storybook`
