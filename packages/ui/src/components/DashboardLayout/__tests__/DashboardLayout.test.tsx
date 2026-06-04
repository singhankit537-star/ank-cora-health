import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DashboardLayout from '../DashboardLayout'

describe('DashboardLayout', () => {
  const onLogout = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the CORA Health branding', () => {
    render(<DashboardLayout onLogout={onLogout}><p>content</p></DashboardLayout>)
    expect(screen.getByText('CORA')).toBeInTheDocument()
    expect(screen.getByText('Health')).toBeInTheDocument()
  })

  it('renders children inside main', () => {
    render(
      <DashboardLayout onLogout={onLogout}>
        <p>Dashboard content</p>
      </DashboardLayout>
    )
    expect(screen.getByRole('main')).toContainElement(screen.getByText('Dashboard content'))
  })

  it('renders a Log out button', () => {
    render(<DashboardLayout onLogout={onLogout}><span /></DashboardLayout>)
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
  })

  it('calls onLogout when Log out is clicked', async () => {
    render(<DashboardLayout onLogout={onLogout}><span /></DashboardLayout>)
    await userEvent.click(screen.getByRole('button', { name: /log out/i }))
    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it('renders portalLabel when provided', () => {
    render(
      <DashboardLayout onLogout={onLogout} portalLabel="Admin Portal">
        <span />
      </DashboardLayout>
    )
    expect(screen.getByText('Admin Portal')).toBeInTheDocument()
  })

  it('does not render portalLabel element when not provided', () => {
    render(<DashboardLayout onLogout={onLogout}><span /></DashboardLayout>)
    expect(screen.queryByText('Admin Portal')).not.toBeInTheDocument()
  })
})
