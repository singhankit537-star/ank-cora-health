import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import type { AuthContextType, AuthState, User } from '../types/auth'
import {
  loginUser,
  logoutUser,
  refreshSession as refreshSessionService,
} from '../services/authService'

// ---------------------------------------------------------------------------
// State + reducer
// ---------------------------------------------------------------------------
type AuthAction =
  | { type: 'LOADING' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SESSION_RESTORED'; payload: User }
  | { type: 'SESSION_NOT_FOUND' }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // true on mount so we never flash the login page
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true }
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case 'SESSION_RESTORED':
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case 'SESSION_NOT_FOUND':
      return { user: null, isAuthenticated: false, isLoading: false }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false }
    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const AuthContext = createContext<AuthContextType | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // On first mount, attempt to restore a previous session from localStorage.
  // isLoading stays true until this resolves, which prevents any route from
  // rendering until we know the auth state.
  useEffect(() => {
    let cancelled = false
    refreshSessionService()
      .then(user => {
        if (cancelled) return
        if (user) {
          dispatch({ type: 'SESSION_RESTORED', payload: user })
        } else {
          dispatch({ type: 'SESSION_NOT_FOUND' })
        }
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: 'SESSION_NOT_FOUND' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'LOADING' })
    const user = await loginUser({ email, password }) // throws on bad creds
    dispatch({ type: 'LOGIN_SUCCESS', payload: user })
  }, [])

  const logout = useCallback(async () => {
    dispatch({ type: 'LOADING' })
    await logoutUser()
    dispatch({ type: 'LOGOUT' })
  }, [])

  const refreshSession = useCallback(async () => {
    const user = await refreshSessionService()
    if (user) {
      dispatch({ type: 'SESSION_RESTORED', payload: user })
    } else {
      dispatch({ type: 'SESSION_NOT_FOUND' })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return ctx
}
