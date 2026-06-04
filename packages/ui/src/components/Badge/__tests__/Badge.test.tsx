import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge', () => {
  it('renders "Patient" label for client role', () => {
    render(<Badge role="client" />)
    expect(screen.getByText('Patient')).toBeInTheDocument()
  })

  it('renders "Administrator" label for admin role', () => {
    render(<Badge role="admin" />)
    expect(screen.getByText('Administrator')).toBeInTheDocument()
  })

  it('applies teal colour classes for client role', () => {
    const { container } = render(<Badge role="client" />)
    const pill = container.firstChild as HTMLElement
    expect(pill.className).toContain('text-cora-teal')
  })

  it('applies orange colour classes for admin role', () => {
    const { container } = render(<Badge role="admin" />)
    const pill = container.firstChild as HTMLElement
    expect(pill.className).toContain('text-cora-orange')
  })
})
