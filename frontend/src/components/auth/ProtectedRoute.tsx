import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '../../store/hooks'

/**
 * Gate for authenticated-only routes. Renders the nested route via <Outlet />
 * when a user is signed in, otherwise redirects to /login (remembering where
 * the user was headed so login can send them back).
 */
export default function ProtectedRoute() {
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
