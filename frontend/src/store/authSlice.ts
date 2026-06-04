import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoginResult, User } from '../services/mockApi'

const STORAGE_KEY = 'cora.auth'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error'

export interface AuthState {
  user: User | null
  token: string | null
  status: AuthStatus
  error: string | null
}

interface PersistedAuth {
  user: User
  token: string
}

// Rehydrate auth from localStorage so a refresh keeps the user signed in.
function loadAuth(): PersistedAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PersistedAuth) : null
  } catch {
    return null
  }
}

const persisted = loadAuth()

const initialState: AuthState = {
  user: persisted?.user ?? null,
  token: persisted?.token ?? null,
  status: persisted ? 'authenticated' : 'idle',
  error: null,
}

export interface LoginCredentials {
  email: string
  password: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Saga trigger — payload is the credentials. Only flips status to loading.
    loginRequested(state, _action: PayloadAction<LoginCredentials>) {
      state.status = 'loading'
      state.error = null
    },
    loginSucceeded(state, action: PayloadAction<LoginResult>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.status = 'authenticated'
      state.error = null
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
      } catch {
        /* ignore quota / privacy-mode errors */
      }
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    },
  },
})

export const { loginRequested, loginSucceeded, loginFailed, logout } = authSlice.actions
export default authSlice.reducer
