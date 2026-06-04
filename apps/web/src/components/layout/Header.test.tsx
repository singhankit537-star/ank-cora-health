import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '@/test/test-utils'
import Header from './Header'

describe('Header', () => {
  it('shows Login link when unauthenticated', () => {
    renderWithStore(<Header />, {
      preloadedState: { auth: { token: null, user: null, loading: false, error: null } },
    })
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('shows Log out button when authenticated', () => {
    renderWithStore(<Header />, {
      preloadedState: {
        auth: {
          token: 'tok',
          user: { id: '1', username: 'admin', name: 'Admin', role: 'admin' as const },
          loading: false,
          error: null,
        },
      },
    })
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
  })

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup()
    renderWithStore(<Header />, {
      preloadedState: { auth: { token: null, user: null, loading: false, error: null } },
    })

    const hamburger = screen.getByRole('button', { name: /toggle navigation menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')

    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows all nav items in mobile menu when open', async () => {
    const user = userEvent.setup()
    renderWithStore(<Header />, {
      preloadedState: { auth: { token: null, user: null, loading: false, error: null } },
    })

    await user.click(screen.getByRole('button', { name: /toggle navigation menu/i }))
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
  })
})
