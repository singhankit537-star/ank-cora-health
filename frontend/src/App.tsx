import { Suspense, lazy, useEffect, useState, useTransition } from 'react'

// HomePage and ConditionPage are direct-landing destinations (root URL + search
// traffic). They ship in the main bundle so there is zero extra network
// round-trip before the LCP element can be painted.
import HomePage from './pages/HomePage'
import ConditionPage from './pages/ConditionPage'

// These pages are only ever reached by navigating *within* the SPA, so the
// lazy chunk fetch is hidden behind startTransition — no visible delay.
const AppointmentPage = lazy(() => import('./pages/AppointmentPage'))
const FindLocationPage = lazy(() => import('./pages/FindLocationPage'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))

function getRoute(): string {
  return window.location.pathname.replace(/^\//, '')
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
  const [, startTransition] = useTransition()

  useEffect(() => {
    // Handle browser back/forward navigation
    const onPopState = () => {
      startTransition(() => setRoute(getRoute()))
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPopState)

    // Intercept clicks on internal links so they use pushState instead of a full page load
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:')
      ) return
      e.preventDefault()
      window.history.pushState(null, '', href)
      startTransition(() => setRoute(getRoute()))
      window.scrollTo(0, 0)
    }
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return <Suspense fallback={<PageFallback />}>{renderRoute(route)}</Suspense>
}
