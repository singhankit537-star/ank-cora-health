import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '@/test/test-utils'
import AdminDashboard from './Dashboard'

const preloadedState = {
  auth: {
    token: 'fake-token',
    user: { id: '1', username: 'admin', name: 'Admin User', role: 'admin' as const },
    loading: false,
    error: null,
  },
}

describe('Admin Dashboard', () => {
  it('renders admin name and panel heading', () => {
    renderWithStore(<AdminDashboard />, { preloadedState })
    expect(screen.getByText(/Admin Panel — Admin User/i)).toBeInTheDocument()
  })

  it('displays admin role badge', () => {
    renderWithStore(<AdminDashboard />, { preloadedState })
    // The role badge has uppercase styling — match the first occurrence
    expect(screen.getAllByText('admin').length).toBeGreaterThanOrEqual(1)
  })

  it('dispatches logout on button click', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<AdminDashboard />, { preloadedState })

    await user.click(screen.getByRole('button', { name: /log out/i }))
    expect(store.getState().auth.token).toBeNull()
    expect(store.getState().auth.user).toBeNull()
  })
})
