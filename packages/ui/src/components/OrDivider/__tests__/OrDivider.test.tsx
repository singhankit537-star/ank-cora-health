import { render, screen } from '@testing-library/react'
import OrDivider from '../OrDivider'

describe('OrDivider', () => {
  it('renders the OR label', () => {
    render(<OrDivider />)
    expect(screen.getByText('OR')).toBeInTheDocument()
  })

  it('is aria-hidden (decorative)', () => {
    const { container } = render(<OrDivider />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
