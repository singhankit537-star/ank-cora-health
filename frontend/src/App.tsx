import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router'
import { useLinkInterceptor } from './hooks/useLinkInterceptor'
import ProtectedRoute from './components/auth/ProtectedRoute'

// HomePage and ConditionPage are direct-landing destinations (root URL + search
// traffic). They ship in the main bundle so there is zero extra network
// round-trip before the LCP element can be painted.
import HomePage from './pages/HomePage'
import ConditionPage from './pages/ConditionPage'

// These pages are only ever reached by navigating *within* the SPA, so the
// lazy chunk fetch is hidden behind React Router's pending UI — no visible delay.
const AppointmentPage = lazy(() => import('./pages/AppointmentPage/AppointmentPage'))
const FindLocationPage = lazy(() => import('./pages/FindLocationPage'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const PaymentHistoryPage = lazy(() => import('./pages/PaymentHistory'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Full-screen fallback shown while a page chunk is being fetched.
function PageFallback() {
  return (
    <div
      className="grid min-h-screen place-items-center bg-white"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cora-sky border-t-cora-blue" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

// Wrap a lazily-loaded page in its own Suspense boundary so only the page chunk
// gates on the fallback, not the rest of the shell.
function lazyRoute(element: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>
}

// Root layout: keeps the app's single global click-interceptor so every plain
// <a href> internal link navigates through the SPA router instead of triggering
// a full page load, and restores scroll position across navigations.
function RootLayout() {
  useLinkInterceptor()

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'condition/:slug', element: <ConditionPage /> },
      { path: 'appointment', element: lazyRoute(<AppointmentPage />) },
      { path: 'locations', element: lazyRoute(<FindLocationPage />) },
      { path: 'leadership', element: lazyRoute(<LeadershipPage />) },
      { path: 'login', element: lazyRoute(<LoginPage />) },
      { path: 'contact', element: lazyRoute(<ContactPage />) },
      // Protected: only reachable once authenticated, else redirected to /login.
      {
        element: <ProtectedRoute />,
        children: [{ path: 'dashboard', element: lazyRoute(<DashboardPage />) }],
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: 'payment-history', element: lazyRoute(<PaymentHistoryPage />) }],
      }
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
