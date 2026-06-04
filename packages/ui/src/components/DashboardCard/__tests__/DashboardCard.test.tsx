import { render, screen } from '@testing-library/react'
import DashboardCard from '../DashboardCard'

describe('DashboardCard', () => {
  const props = {
    icon: '📅',
    title: 'Appointments',
    description: 'View and manage your appointments.',
  }

  it('renders the title', () => {
    render(<DashboardCard {...props} />)
    expect(screen.getByText('Appointments')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<DashboardCard {...props} />)
    expect(screen.getByText('View and manage your appointments.')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    render(<DashboardCard {...props} />)
    expect(screen.getByText('📅')).toBeInTheDocument()
  })

  it('marks icon container as aria-hidden', () => {
    const { container } = render(<DashboardCard {...props} />)
    const iconDiv = container.querySelector('[aria-hidden="true"]')
    expect(iconDiv).toBeInTheDocument()
  })
})
