import { useEffect, useState } from 'react'
import AppointmentPage from './pages/AppointmentPage'
import FindLocationPage from './pages/FindLocationPage'
import HomePage from './pages/HomePage'

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
  return <HomePage />
}
