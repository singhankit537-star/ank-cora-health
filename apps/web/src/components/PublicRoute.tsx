import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Wraps routes that should only be accessible when the user is NOT logged in
 * (e.g. /login, /register, /forgot-password).
 *
 * Behaviour:
 *  - Loading → render nothing (avoids flickering between login and dashboard).
 *  - Authenticated → redirect to /dashboard.
 *  - Unauthenticated → render child routes via <Outlet />.
 */
export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  // During the initial session check, render nothing so the user doesn't see
  // the login form briefly before being redirected to the dashboard.
  if (isLoading) return null

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
