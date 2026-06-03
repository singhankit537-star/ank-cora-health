import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface LocationState {
  from?: { pathname: string }
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as LocationState)?.from?.pathname ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cora-light px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <span className="text-3xl font-bold text-cora-navy">CORA</span>
          <span className="ml-1 text-3xl font-light text-cora-blue">Health</span>
          <p className="mt-2 text-sm text-cora-gray">Sign in to your patient portal</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <h1 className="mb-6 text-xl font-semibold text-cora-navy">Welcome back</h1>

          {/* Demo hint */}
          <div className="mb-6 rounded-lg bg-cora-sky p-3 text-xs text-cora-blue">
            <strong>Demo credentials</strong>
            <br />
            Patient: <code>patient@corahealth.com</code> / <code>password123</code>
            <br />
            Admin: <code>admin@corahealth.com</code> / <code>admin123</code>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cora-navy">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-cora-blue focus:ring-2 focus:ring-cora-blue/20 disabled:opacity-50"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-cora-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-cora-blue focus:ring-2 focus:ring-cora-blue/20 disabled:opacity-50"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg bg-cora-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cora-navy disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-cora-gray">
          &copy; {new Date().getFullYear()} CORA Health. All rights reserved.
        </p>
      </div>
    </div>
  )
}
