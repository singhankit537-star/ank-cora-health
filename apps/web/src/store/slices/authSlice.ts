import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '@/services/api/client'
import type { User, LoginCredentials, AuthTokenResponse } from '@/types'

const TOKEN_KEY = 'cora_auth_token'
const USER_KEY = 'cora_auth_user'

function readStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: readStoredUser(),
  token: readStoredToken(),
  loading: false,
  error: null,
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    const response = await apiClient.post<AuthTokenResponse>('/auth/login', credentials, {
      retries: 0,
    })
    if (!response.success || !response.data) {
      return rejectWithValue(response.error ?? 'Login failed')
    }
    return response.data
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload.user
        state.token = payload.token
        localStorage.setItem(TOKEN_KEY, payload.token)
        localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.loading = false
        state.error = (payload as string) ?? 'Login failed'
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
