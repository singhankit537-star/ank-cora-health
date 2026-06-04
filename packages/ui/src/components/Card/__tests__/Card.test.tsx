import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders as a div by default', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as the specified element via `as` prop', () => {
    const { container } = render(<Card as="article">Content</Card>)
    expect(container.firstChild?.nodeName).toBe('ARTICLE')
  })

  it('applies hover shadow class when hover=true', () => {
    const { container } = render(<Card hover>Content</Card>)
    expect((container.firstChild as HTMLElement).className).toContain('hover:shadow-xl')
  })

  it('does not apply hover shadow class when hover=false', () => {
    const { container } = render(<Card>Content</Card>)
    expect((container.firstChild as HTMLElement).className).not.toContain('hover:shadow-xl')
  })

  it('forwards additional className', () => {
    const { container } = render(<Card className="extra">Content</Card>)
    expect((container.firstChild as HTMLElement).className).toContain('extra')
  })
})
