export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'patient'
  avatarUrl?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthTokenPayload {
  userId: string
  email: string
  name: string
  role: User['role']
  exp: number // Unix timestamp
}
