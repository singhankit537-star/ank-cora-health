import { render, screen } from '@testing-library/react'
import ServiceCard from '../ServiceCard'
import type { Service } from '../ServiceCard'

const service: Service = {
  id: 'pt-1',
  name: 'Manual Therapy',
  description: 'Personalised rehabilitation programs.',
  category: 'physical-therapy',
  icon: '🦴',
}

describe('ServiceCard', () => {
  it('renders the service name as a heading', () => {
    render(<ServiceCard service={service} />)
    expect(screen.getByRole('heading', { name: 'Manual Therapy' })).toBeInTheDocument()
  })

  it('renders the service description', () => {
    render(<ServiceCard service={service} />)
    expect(screen.getByText('Personalised rehabilitation programs.')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    render(<ServiceCard service={service} />)
    expect(screen.getByText('🦴')).toBeInTheDocument()
  })

  it('renders the human-readable category label', () => {
    render(<ServiceCard service={service} />)
    expect(screen.getByText('Physical Therapy')).toBeInTheDocument()
  })

  it.each([
    ['rehabilitation', 'Rehabilitation'],
    ['sports-medicine', 'Sports Medicine'],
    ['wellness', 'Wellness'],
  ] as const)('renders correct label for %s category', (category, label) => {
    render(<ServiceCard service={{ ...service, category }} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
