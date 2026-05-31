# Storybook

All component stories live here, separate from production source in `src/`.

## Structure

```
storybook/
├── decorators/       # Redux provider, layout wrappers
├── parameters.js     # Shared Storybook parameters
└── stories/
    ├── ui/           # Presentational primitives
    ├── layout/       # Header, Footer, nav
    ├── sections/     # Page sections
    └── pages/        # Full page compositions
```

## Conventions

- Import components via `@/components/...` alias.
- Use `parameters.redux.preloadedState` to seed Redux per story.
- Keep components in `src/` free of `.stories.*` files.

## Commands

```bash
npm run storybook
npm run build-storybook
```
