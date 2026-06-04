import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IconInput from '../IconInput'

const SearchIcon = () => <svg data-testid="search-icon" />

describe('IconInput', () => {
  it('renders the input element', () => {
    render(<IconInput icon={<SearchIcon />} placeholder="Search" />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('renders the leading icon', () => {
    render(<IconInput icon={<SearchIcon />} />)
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('does not render trailing slot by default', () => {
    const { container } = render(<IconInput icon={<SearchIcon />} />)
    // Only one span wrapper (the icon span)
    const spans = container.querySelectorAll('span')
    expect(spans).toHaveLength(1)
  })

  it('renders trailing element when provided', () => {
    render(
      <IconInput
        icon={<SearchIcon />}
        trailing={<button data-testid="locate-btn">Locate</button>}
      />
    )
    expect(screen.getByTestId('locate-btn')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<IconInput icon={<SearchIcon />} placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    await userEvent.type(input, 'therapy')
    expect(input).toHaveValue('therapy')
  })

  it('is disabled when disabled prop is set', () => {
    render(<IconInput icon={<SearchIcon />} disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })
})
