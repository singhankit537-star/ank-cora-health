import { render, screen } from '@testing-library/react'
import ClinicCard from '../ClinicCard'

const clinic = {
  city: 'Jacksonville',
  state: 'FL',
  address: ['123 Health Ave', 'Jacksonville, FL 32202'],
  phone: '(904) 555-0100',
  lat: 30.3322,
  lng: -81.6557,
}

describe('ClinicCard', () => {
  it('renders the clinic city in the heading', () => {
    render(<ClinicCard clinic={clinic} />)
    expect(screen.getByRole('heading', { name: /jacksonville/i })).toBeInTheDocument()
  })

  it('renders each address line as a link', () => {
    render(<ClinicCard clinic={clinic} />)
    expect(screen.getByText('123 Health Ave')).toBeInTheDocument()
    expect(screen.getByText('Jacksonville, FL 32202')).toBeInTheDocument()
  })

  it('renders the phone number as a tel link', () => {
    render(<ClinicCard clinic={clinic} />)
    const phoneLink = screen.getByRole('link', { name: /904.*555.*0100/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:9045550100')
  })
})
