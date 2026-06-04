import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggle from '../Toggle'

describe('Toggle', () => {
  const defaultProps = {
    checked: false,
    onChange: vi.fn(),
    label: 'Enable notifications',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the label text', () => {
    render(<Toggle {...defaultProps} />)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
  })

  it('has role="switch"', () => {
    render(<Toggle {...defaultProps} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('reflects unchecked state via aria-checked', () => {
    render(<Toggle {...defaultProps} checked={false} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('reflects checked state via aria-checked', () => {
    render(<Toggle {...defaultProps} checked={true} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange with next value when clicked', async () => {
    const onChange = vi.fn()
    render(<Toggle {...defaultProps} checked={false} onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when toggled off', async () => {
    const onChange = vi.fn()
    render(<Toggle {...defaultProps} checked={true} onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('is disabled when disabled prop is set', () => {
    render(<Toggle {...defaultProps} disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    render(<Toggle {...defaultProps} disabled onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
