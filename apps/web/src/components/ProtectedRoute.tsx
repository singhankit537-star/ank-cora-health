import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Wraps routes that require authentication.
 *
 * Behaviour:
 *  - While the auth state is being resolved (initial page load) → render a
 *    full-screen spinner so we never flash the login page.
 *  - Unauthenticated → redirect to /login, preserving the intended destination
 *    in `location.state.from` so the login page can send the user back after.
 *  - Authenticated → render child routes via <Outlet />.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        className="grid min-h-screen place-items-center bg-white"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cora-sky border-t-cora-blue" />
          <p className="text-sm text-cora-gray">Verifying your session…</p>
        </div>
        <span className="sr-only">Checking authentication…</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
