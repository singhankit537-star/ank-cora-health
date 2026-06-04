import { render, screen } from '@testing-library/react'
import Select from '../Select'

describe('Select', () => {
  const stringOptions = ['Alabama', 'Florida', 'Georgia']
  const objectOptions = [
    { value: 'al', label: 'Alabama' },
    { value: 'fl', label: 'Florida' },
  ]

  it('renders a select element', () => {
    render(<Select />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders a label when label prop is provided', () => {
    render(<Select label="State" options={stringOptions} />)
    expect(screen.getByLabelText('State')).toBeInTheDocument()
  })

  it('auto-generates id from label text', () => {
    render(<Select label="Home State" options={stringOptions} />)
    expect(screen.getByLabelText('Home State')).toHaveAttribute('id', 'home-state')
  })

  it('renders string options', () => {
    render(<Select options={stringOptions} />)
    expect(screen.getByRole('option', { name: 'Alabama' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Florida' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Georgia' })).toBeInTheDocument()
  })

  it('renders object options with correct value and label', () => {
    render(<Select options={objectOptions} />)
    const alabamaOpt = screen.getByRole('option', { name: 'Alabama' }) as HTMLOptionElement
    expect(alabamaOpt.value).toBe('al')
    const floridaOpt = screen.getByRole('option', { name: 'Florida' }) as HTMLOptionElement
    expect(floridaOpt.value).toBe('fl')
  })

  it('renders no options when options prop is empty', () => {
    render(<Select />)
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })
})
