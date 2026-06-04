import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/slices/authSlice'
import locationReducer from '@/store/slices/locationSlice'
import type { RootState } from '@/store'

interface RenderWithStoreOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>
  initialEntries?: string[]
}

export function renderWithStore(
  ui: React.ReactElement,
  { preloadedState, initialEntries = ['/'], ...options }: RenderWithStoreOptions = {},
) {
  const testStore = configureStore({
    reducer: { auth: authReducer, locations: locationReducer },
    preloadedState: preloadedState as Parameters<typeof configureStore>[0]['preloadedState'],
  })

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={testStore}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </Provider>
    )
  }

  return { store: testStore, ...render(ui, { wrapper: Wrapper, ...options }) }
}
