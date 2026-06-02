import { Suspense, lazy, useEffect, useState } from 'react'

// Route-level code splitting: each page ships as its own chunk and is only
// fetched when the user navigates to it, shrinking the initial bundle.
const HomePage = lazy(() => import('./pages/HomePage'))
const AppointmentPage = lazy(() => import('./pages/AppointmentPage'))
const ConditionPage = lazy(() => import('./pages/ConditionPage'))
const FindLocationPage = lazy(() => import('./pages/FindLocationPage'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))

function getRoute(): string {
  return window.location.hash.replace(/^#\/?/, '')
}

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

function renderRoute(route: string) {
  if (route === 'appointment') return <AppointmentPage />
  if (route === 'locations') return <FindLocationPage />
  if (route === 'leadership') return <LeadershipPage />
  if (route.startsWith('condition/')) {
    return <ConditionPage slug={route.slice('condition/'.length)} />
  }
  return <HomePage />
}

export default function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return <Suspense fallback={<PageFallback />}>{renderRoute(route)}</Suspense>
}
