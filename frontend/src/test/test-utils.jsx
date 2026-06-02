import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createAppStore } from '../store'

export function renderWithProviders(
  ui,
  {
    preloadedState,
    store = createAppStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
