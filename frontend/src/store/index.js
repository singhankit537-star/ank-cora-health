import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slices/locationSlice'
import testimonialsReducer from './slices/testimonialsSlice'
import uiReducer from './slices/uiSlice'

export function createAppStore(preloadedState) {
  return configureStore({
    reducer: {
      location: locationReducer,
      testimonials: testimonialsReducer,
      ui: uiReducer,
    },
    preloadedState,
  })
}

export const store = createAppStore()
