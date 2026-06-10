import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Container from '../components/ui/Container'
import { loginRequested } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface LocationState {
  from?: string
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error, user } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirectTo = (location.state as LocationState | null)?.from ?? '/dashboard'

  // Once authenticated (fresh login or already-signed-in visit), leave the page.
  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true })
  }, [user, navigate, redirectTo])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginRequested({ email, password }))
  }

  const loading = status === 'loading'

  return (
    <div className="grid min-h-screen place-items-center bg-cora-light px-4 py-12">
      <Container className="max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-cora-navy/5">
          {/* Brand */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cora-blue text-lg font-bold text-white">
              C
            </div>
            <span className="text-xl font-bold text-cora-navy">CORA Patient Portal</span>
          </div>

          <h1 className="text-center text-2xl font-bold text-cora-navy">Sign in</h1>
          <p className="mt-1 text-center text-sm text-cora-gray">
            Access your medical history and care plan.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cora-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cora-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-cora-orange px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Escape hatch back to the public site. */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-cora-blue transition-colors hover:text-cora-navy"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </button>
        </div>
      </Container>
    </div>
  )
}
