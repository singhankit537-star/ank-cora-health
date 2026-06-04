import { render, screen } from '@testing-library/react'
import PageHero from '../PageHero'

describe('PageHero', () => {
  it('renders the title as an h1', () => {
    render(<PageHero title="What We Treat" />)
    expect(screen.getByRole('heading', { level: 1, name: 'What We Treat' })).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<PageHero title="Services" subtitle="Explore our offerings" />)
    expect(screen.getByText('Explore our offerings')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<PageHero title="Services" />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })
})
