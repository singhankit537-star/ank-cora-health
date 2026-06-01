import { useEffect, useState } from 'react'
import AppointmentPage from './pages/AppointmentPage'
import ConditionPage from './pages/ConditionPage'
import FindLocationPage from './pages/FindLocationPage'
import HomePage from './pages/HomePage'
import LeadershipPage from './pages/LeadershipPage'

function getRoute() {
  return window.location.hash.replace(/^#\/?/, '')
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

  if (route === 'appointment') return <AppointmentPage />
  if (route === 'locations') return <FindLocationPage />
  if (route === 'leadership') return <LeadershipPage />
  if (route.startsWith('condition/')) {
    return <ConditionPage slug={route.slice('condition/'.length)} />
  }
  return <HomePage />
}
