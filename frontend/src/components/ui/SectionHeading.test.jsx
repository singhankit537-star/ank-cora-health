import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SectionHeading from './SectionHeading'

describe('SectionHeading', () => {
  it('renders title and subtitle', () => {
    render(
      <SectionHeading title="Testimonials" subtitle="Patient stories" />,
    )
    expect(screen.getByRole('heading', { name: 'Testimonials' })).toBeInTheDocument()
    expect(screen.getByText('Patient stories')).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<SectionHeading eyebrow="News" title="Updates" />)
    expect(screen.getByText('News')).toBeInTheDocument()
  })
})
