import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button', () => {
  it('renders a <button> by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders an <a> when href is provided', () => {
    render(<Button href="/path">Go</Button>)
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/path')
  })

  it('calls onClick handler when clicked', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Press</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler} disabled>Press</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).not.toHaveBeenCalled()
  })

  it.each(['primary', 'secondary', 'outline', 'ghost', 'white'] as const)(
    'renders %s variant without error',
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument()
    }
  )

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(<Button size={size}>{size}</Button>)
    expect(screen.getByRole('button', { name: size })).toBeInTheDocument()
  })

  it('forwards additional className', () => {
    render(<Button className="custom-class">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
