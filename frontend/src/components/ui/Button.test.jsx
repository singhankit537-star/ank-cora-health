import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Schedule</Button>)
    expect(screen.getByRole('button', { name: 'Schedule' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as link when href is provided', () => {
    render(<Button href="#careers">Careers</Button>)
    expect(screen.getByRole('link', { name: 'Careers' })).toHaveAttribute('href', '#careers')
  })
})
