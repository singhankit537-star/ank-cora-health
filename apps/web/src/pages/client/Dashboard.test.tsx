import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '@/test/test-utils'
import ClientDashboard from './Dashboard'

const preloadedState = {
  auth: {
    token: 'fake-token',
    user: { id: '2', username: 'client1', name: 'Jane Doe', role: 'client' as const },
    loading: false,
    error: null,
  },
}

describe('Client Dashboard', () => {
  it('renders welcome message with user name', () => {
    renderWithStore(<ClientDashboard />, { preloadedState })
    expect(screen.getByText(/Welcome back, Jane Doe/i)).toBeInTheDocument()
  })

  it('displays client role badge', () => {
    renderWithStore(<ClientDashboard />, { preloadedState })
    expect(screen.getByText('client')).toBeInTheDocument()
  })

  it('dispatches logout on button click', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<ClientDashboard />, { preloadedState })

    await user.click(screen.getByRole('button', { name: /log out/i }))
    expect(store.getState().auth.token).toBeNull()
    expect(store.getState().auth.user).toBeNull()
  })
})
