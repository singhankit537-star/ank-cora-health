// Vitest setup, loaded before every test file (see test.setupFiles in
// vite.config.ts).

// Registers jest-dom matchers (toBeInTheDocument, toHaveValue, …) on Vitest's
// `expect` and augments its types.
import '@testing-library/jest-dom/vitest'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount React trees between tests so the DOM doesn't leak across cases.
afterEach(() => {
  cleanup()
})
