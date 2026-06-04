import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders a label when label prop is provided', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('auto-generates id from label text', () => {
    render(<Input label="First Name" />)
    expect(screen.getByLabelText('First Name')).toHaveAttribute('id', 'first-name')
  })

  it('uses explicit id over auto-generated one', () => {
    render(<Input label="Email" id="custom-id" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'custom-id')
  })

  it('renders placeholder text', () => {
    render(<Input placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'hello')
    expect(input).toHaveValue('hello')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('does not render label element when label prop is absent', () => {
    render(<Input placeholder="No label" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })
})
