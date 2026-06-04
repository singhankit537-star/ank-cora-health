import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '@/services/api/client'
import type { Location } from '@/types'

interface LocationState {
  locations: Location[]
  loading: boolean
  error: string | null
}

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
}

export const fetchLocations = createAsyncThunk(
  'locations/fetch',
  async (_, { rejectWithValue }) => {
    const response = await apiClient.get<Location[]>('/locations')
    if (!response.success || !response.data) {
      return rejectWithValue(response.error ?? 'Failed to fetch locations')
    }
    return response.data
  },
)

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLocations.fulfilled, (state, { payload }) => {
        state.loading = false
        state.locations = payload
      })
      .addCase(fetchLocations.rejected, (state, { payload }) => {
        state.loading = false
        state.error = (payload as string) ?? 'Failed to load locations'
      })
  },
})

export default locationSlice.reducer
