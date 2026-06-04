import { render, screen } from '@testing-library/react'
import SectionHeading from '../SectionHeading'

describe('SectionHeading', () => {
  it('renders the title as an h2', () => {
    render(<SectionHeading title="Our Services" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Our Services' })).toBeInTheDocument()
  })

  it('renders eyebrow text when provided', () => {
    render(<SectionHeading eyebrow="Specialties" title="What We Do" />)
    expect(screen.getByText('Specialties')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Title" subtitle="Supporting description" />)
    expect(screen.getByText('Supporting description')).toBeInTheDocument()
  })

  it('does not render eyebrow when not provided', () => {
    render(<SectionHeading title="Title" />)
    expect(screen.queryByText('Specialties')).not.toBeInTheDocument()
  })

  it('applies text-white class when light=true', () => {
    const { container } = render(<SectionHeading title="Light Heading" light />)
    const h2 = container.querySelector('h2')
    expect(h2?.className).toContain('text-white')
  })

  it('applies text-cora-navy class when light=false (default)', () => {
    const { container } = render(<SectionHeading title="Dark Heading" />)
    const h2 = container.querySelector('h2')
    expect(h2?.className).toContain('text-cora-navy')
  })

  it('applies center alignment by default', () => {
    const { container } = render(<SectionHeading title="Centred" />)
    expect((container.firstChild as HTMLElement).className).toContain('text-center')
  })

  it('applies left alignment when align="left"', () => {
    const { container } = render(<SectionHeading title="Left" align="left" />)
    expect((container.firstChild as HTMLElement).className).toContain('text-left')
  })
})
