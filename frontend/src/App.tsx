import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Outlet,
} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

// ---------------------------------------------------------------------------
// Route-level code splitting
//
// HomePage and ConditionPage are direct-landing destinations (root URL + SEO
// traffic). They ship in the main bundle so there is zero extra round-trip
// before the LCP element can be painted.
// ---------------------------------------------------------------------------
import HomePage from './pages/HomePage'
import ConditionPage from './pages/ConditionPage'

// ---------------------------------------------------------------------------
// Root layout — adds scroll-restoration and renders the matched child route
// ---------------------------------------------------------------------------
function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

// ---------------------------------------------------------------------------
// Router definition
//
// Route hierarchy:
//
//   RootLayout
//   ├── PublicRoute            ← redirects to /dashboard when authenticated
//   │   └── /login
//   ├── ProtectedRoute         ← redirects to /login when unauthenticated
//   │   └── /dashboard
//   └── Open routes            ← accessible to everyone (marketing pages)
//       ├── /
//       ├── /appointment
//       ├── /locations
//       ├── /leadership
//       └── /condition/:slug
// ---------------------------------------------------------------------------
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // ── Auth-only routes (redirect to /dashboard if already logged in) ──
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/login',
            lazy: async () => {
              const { default: Component } = await import('./pages/LoginPage')
              return { Component }
            },
          },
        ],
      },

      // ── Protected routes (redirect to /login if not logged in) ──
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            lazy: async () => {
              const { default: Component } = await import('./pages/DashboardPage')
              return { Component }
            },
          },
        ],
      },

      // ── Open / marketing routes (no auth requirement) ──
      { path: '/', element: <HomePage /> },
      {
        path: '/appointment',
        lazy: async () => {
          const { default: Component } = await import('./pages/AppointmentPage')
          return { Component }
        },
      },
      {
        path: '/locations',
        lazy: async () => {
          const { default: Component } = await import('./pages/FindLocationPage')
          return { Component }
        },
      },
      {
        path: '/leadership',
        lazy: async () => {
          const { default: Component } = await import('./pages/LeadershipPage')
          return { Component }
        },
      },
      { path: '/condition/:slug', element: <ConditionPage /> },

      // ── Catch-all ──
      { path: '*', element: <HomePage /> },
    ],
  },
])

// ---------------------------------------------------------------------------
// App root — wraps the entire tree with AuthProvider so every route can
// access auth state, then hands control to the router.
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
