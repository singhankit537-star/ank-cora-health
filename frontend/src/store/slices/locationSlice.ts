import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: '',
  radius: '50',
  resultsLimit: '8',
  isSearching: false,
  hasSearched: false,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    setRadius(state, action) {
      state.radius = action.payload
    },
    setResultsLimit(state, action) {
      state.resultsLimit = action.payload
    },
    startSearch(state) {
      state.isSearching = true
    },
    searchComplete(state) {
      state.isSearching = false
      state.hasSearched = true
    },
    resetLocationSearch() {
      return initialState
    },
  },
})

export const {
  setQuery,
  setRadius,
  setResultsLimit,
  startSearch,
  searchComplete,
  resetLocationSearch,
} = locationSlice.actions

export default locationSlice.reducer
