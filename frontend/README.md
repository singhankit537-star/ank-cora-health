# CoraHealth - Production-Grade React Application

A modern, production-ready React 19 application built with Vite, TypeScript, and Tailwind CSS. This project demonstrates industry best practices for large-scale React applications with emphasis on performance, testing, and maintainability.

## 🎯 Project Overview

This is a learning sprint project that builds a generic physical therapy clinic website to showcase:

- **Modern React Architecture**: React 19 with functional components and hooks
- **Performance Optimization**: Route-level code splitting with React.lazy and Suspense
- **TypeScript Strictness**: Full TypeScript strict mode with proper typing
- **Testing Discipline**: 90%+ code coverage with Vitest and React Testing Library
- **Component Architecture**: Reusable UI components with Storybook documentation
- **Custom Hooks**: Purpose-built hooks demonstrating React patterns
- **Higher Order Components**: Error boundary wrapper for robust error handling
- **API Layer**: Generic fetch client with retry logic and resilient data loading
- **Styling**: TailwindCSS v4 with no inline styles or external CSS files

## 📋 Tech Stack

- **React 19** - UI library with latest features
- **Vite 8** - Fast build tool and dev server
- **TypeScript 5** - Static type checking in strict mode
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router 7** - Client-side routing with lazy loading
- **Vitest** - Unit testing framework with excellent TypeScript support
- **React Testing Library** - Component testing with user-centric approach
- **Storybook 8** - Component documentation and visual testing

## 🚀 Quick Start

```bash
npm install
npm run dev          # Start development server
npm run build        # Production build
npm run test:coverage # Run tests with coverage report
npm run storybook    # View component library
npm run lint         # Check code quality
```

## 📊 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production (includes TypeScript check) |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report (must be ≥90%) |
| `npm run test:ui` | Interactive test UI dashboard |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run storybook` | Launch Storybook at port 6006 |
| `npm run type-check` | Run TypeScript compiler |

## 🏗️ Project Architecture

### Folder Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (Button, Card, Input, etc.)
│   └── layout/      # Layout components (Header, Footer, Layout)
├── pages/           # Page components (lazy-loaded routes)
├── hooks/           # Custom hooks (useLocalStorage, useFetch, useDebounce)
├── hocs/            # Higher Order Components (withErrorBoundary)
├── services/api/    # API client with Promise.all/allSettled patterns
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main app with React Router
├── main.tsx         # Entry point
└── index.css        # Global styles with TailwindCSS

tests/
└── setupTests.ts    # Test configuration

.storybook/          # Storybook configuration
```

### Key Design Patterns

#### 1. API Layer with Resilience

```typescript
// Promise.all() - Critical data (all or nothing)
const data = await homepageApi.getHomePageData();

// Promise.allSettled() - Resilient data (partial success OK)
const { data, failures } = await resilientLocationsApi.getLocationsWithDetails(ids);
```

#### 2. Custom Hooks

**useLocalStorage** - Persist state to localStorage with cross-tab sync
**useFetch** - Async data loading with caching
**useDebounce** - Debounce values and callbacks

#### 3. Route-Level Code Splitting

```typescript
const Home = React.lazy(() => import('@pages/Home'));
// Rendered with <Suspense fallback={<Loader />}>
```

#### 4. Higher Order Components

```typescript
const SafePage = withErrorBoundary(RiskyComponent);
```

## 🧪 Testing Strategy

- **Unit Tests**: Components, hooks, utilities
- **Integration Tests**: Page components
- **Accessibility Tests**: WCAG compliance
- **90%+ Coverage Required**: Statements, branches, functions, lines

### Running Tests

```bash
npm run test              # Watch mode
npm run test:coverage     # Generate coverage report
npm run test:ui           # Interactive dashboard
```

Example test:
```typescript
describe('Button', () => {
  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 📖 Storybook Component Documentation

Launch Storybook to view all reusable components with interactive controls:

```bash
npm run storybook
```

Features:
- ✅ Interactive component variants
- ✅ Live prop controls
- ✅ Accessibility testing
- ✅ Auto-generated documentation

Covered components:
- Button (variants, sizes, states)
- Card (standard, hoverable)
- Input (with validation)
- Select (dropdown)
- Container (responsive layout)
- SectionHeading

## 🎨 Styling with Tailwind CSS v4

### Principles

✅ **No inline styles** - All styling via Tailwind classes
✅ **No custom CSS** - Except tailwind.config.ts and index.css
✅ **Component extraction** - Repeated patterns → components
✅ **Mobile-first** - md: and lg: breakpoints

### Custom Theme

Brand colors defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: { 50, 100, 200, ..., 900 }
}
```

### Custom Utilities (index.css)

```css
@layer components {
  .btn-primary { @apply px-4 py-2 bg-blue-600 text-white rounded-lg; }
}
```

## 🔍 Code Quality Standards

### ESLint Rules Enforced

- React best practices
- React Hooks rules
- TypeScript strict checking
- Accessibility (jsx-a11y)
- No `any` types
- No console.log in production

### Running Checks

```bash
npm run lint           # Check only
npm run lint:fix       # Auto-fix issues
npm run format         # Format code
npm run format:check   # Check formatting
npm run type-check     # TypeScript compiler
```

## 📈 Performance Optimizations

1. ✅ **Code Splitting** - Route-level lazy loading
2. ✅ **Memoization** - useMemo, useCallback for expensive ops
3. ✅ **Caching** - API response caching (5-minute TTL)
4. ✅ **Tree Shaking** - Vite removes unused code
5. ✅ **Suspense Boundaries** - Progressive page loading

## 🏛️ Architecture Highlights

### 1. UI Component Architecture

Every UI component:
- ✅ <150 lines
- ✅ Single responsibility
- ✅ Fully type-safe
- ✅ Comprehensive tests
- ✅ Storybook stories
- ✅ Accessible markup

### 2. Page Components

Every page:
- ✅ Lazy-loaded for code splitting
- ✅ Error boundary wrapped
- ✅ Full test coverage
- ✅ Responsive design
- ✅ Accessible navigation

### 3. Custom Hooks

Demonstrate:
- ✅ useState, useEffect, useCallback, useMemo, useRef
- ✅ Custom logic extraction
- ✅ Reusable behavior
- ✅ Comprehensive testing

### 4. API Layer

Features:
- ✅ Generic fetch wrapper
- ✅ Timeout handling (10s default)
- ✅ Retry logic (exponential backoff)
- ✅ Promise.all() for critical data
- ✅ Promise.allSettled() for resilient data
- ✅ Mock data for development

## ✅ Pre-Deployment Checklist

Before deploying to production:

```bash
npm run lint              # ✅ Must pass with zero warnings
npm run test:coverage     # ✅ Must be ≥90% coverage
npm run type-check        # ✅ Must show no errors
npm run build             # ✅ Must succeed
npm run storybook build   # ✅ Must build successfully
```

## 📚 Component Library

### UI Components

- **Button** - Primary, secondary, outline, danger variants
- **Card** - Container with optional hover effect
- **Input** - Text input with label, error, helper text
- **Select** - Dropdown select with options
- **Container** - Responsive max-width container
- **SectionHeading** - Title with optional subtitle

### Layout Components

- **Header** - Navigation with mobile menu
- **Footer** - Footer with links and copyright
- **Layout** - Wrapper with Header + Footer

### Page Components

- **Home** - Hero, services, testimonials, CTA sections
- **Services** - Service cards with benefits
- **Locations** - Clinic locations with hours
- **About** - Mission, values, team information
- **Contact** - Contact form with validation

## 🔐 Best Practices

- ✅ Type-safe API calls (no `any` types)
- ✅ Proper error handling and logging
- ✅ Accessible markup (WCAG 2.1 Level AA)
- ✅ Responsive mobile-first design
- ✅ No secrets in code (env variables)
- ✅ Zero production console warnings

## 📖 Key Learning Outcomes

This project demonstrates production-grade React patterns:

1. ✅ Enterprise folder structure
2. ✅ TypeScript strict mode mastery
3. ✅ Testing discipline (90%+ coverage)
4. ✅ React Router with code splitting
5. ✅ Custom hooks best practices
6. ✅ HOC pattern for reusable behavior
7. ✅ API resilience patterns
8. ✅ Component library architecture
9. ✅ Storybook documentation
10. ✅ ESLint/Prettier standards

## 🤝 Contributing

1. All new components must have tests and stories
2. Maintain 90%+ code coverage
3. Run `npm run lint:fix && npm run format` before committing
4. Components must be <150 lines
5. Use TypeScript strict mode
6. No inline styles or external CSS files

## 📝 License

MIT

---

Built as a production-grade learning sprint demonstrating modern React 19 architecture and engineering excellence. 🎉
