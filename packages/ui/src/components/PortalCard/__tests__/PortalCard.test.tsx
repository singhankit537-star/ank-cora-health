import { render, screen } from '@testing-library/react'
import PortalCard from '../PortalCard'

describe('PortalCard', () => {
  it('renders the title', () => {
    render(<PortalCard title="My Appointments" description="View your upcoming appointments." />)
    expect(screen.getByText('My Appointments')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<PortalCard title="My Appointments" description="View your upcoming appointments." />)
    expect(screen.getByText('View your upcoming appointments.')).toBeInTheDocument()
  })

  it('renders default badge text "Coming soon"', () => {
    render(<PortalCard title="My Appointments" description="Desc" />)
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
  })

  it('renders custom badge text when provided', () => {
    render(<PortalCard title="My Appointments" description="Desc" badge="Available now" />)
    expect(screen.getByText('Available now')).toBeInTheDocument()
  })
})
