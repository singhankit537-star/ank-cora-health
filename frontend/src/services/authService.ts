import type { User, LoginCredentials, AuthTokenPayload } from '../types/auth'

const TOKEN_KEY = 'cora_auth_token'
const MOCK_DELAY_MS = 600

// ---------------------------------------------------------------------------
// Mock user database
// ---------------------------------------------------------------------------
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: 'usr_001',
    email: 'patient@corahealth.com',
    password: 'password123',
    name: 'Alex Johnson',
    role: 'patient',
    avatarUrl: undefined,
  },
  {
    id: 'usr_002',
    email: 'admin@corahealth.com',
    password: 'admin123',
    name: 'Dr. Sarah Kim',
    role: 'admin',
    avatarUrl: undefined,
  },
]

// ---------------------------------------------------------------------------
// Token helpers (base64 encoding — mock only, not secure)
// ---------------------------------------------------------------------------
function encodeToken(payload: AuthTokenPayload): string {
  return btoa(JSON.stringify(payload))
}

function decodeToken(token: string): AuthTokenPayload | null {
  try {
    return JSON.parse(atob(token)) as AuthTokenPayload
  } catch {
    return null
  }
}

function isTokenExpired(payload: AuthTokenPayload): boolean {
  return Date.now() / 1000 > payload.exp
}

function generateToken(user: User): string {
  const payload: AuthTokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8-hour session
  }
  return encodeToken(payload)
}

// ---------------------------------------------------------------------------
// Public service API
// ---------------------------------------------------------------------------

/** Simulates a login API call. Throws on invalid credentials. */
export async function loginUser(credentials: LoginCredentials): Promise<User> {
  await new Promise(r => setTimeout(r, MOCK_DELAY_MS))

  const found = MOCK_USERS.find(
    u =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password,
  )

  if (!found) {
    throw new Error('Invalid email or password. Please try again.')
  }

  const { password: _pw, ...user } = found
  const token = generateToken(user)
  localStorage.setItem(TOKEN_KEY, token)
  return user
}

/** Simulates a logout API call and clears the stored token. */
export async function logoutUser(): Promise<void> {
  await new Promise(r => setTimeout(r, 200))
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Reads the stored token and returns the User if valid, otherwise null.
 * Use this on app startup to restore an existing session without a round-trip.
 */
export async function refreshSession(): Promise<User | null> {
  await new Promise(r => setTimeout(r, 300))

  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  const payload = decodeToken(token)
  if (!payload || isTokenExpired(payload)) {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }

  // Re-fetch the "full" user object from the mock DB
  const found = MOCK_USERS.find(u => u.id === payload.userId)
  if (!found) {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }

  const { password: _pw, ...user } = found

  // Slide the expiry window on every valid refresh
  const freshToken = generateToken(user)
  localStorage.setItem(TOKEN_KEY, freshToken)

  return user
}
