import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryCard from '../CategoryCard'

const baseCategory = {
  slug: 'neck',
  name: 'Neck Pain & Injuries',
  intro: 'Treatments for neck conditions.',
  conditionsTreated: ['Whiplash', 'Herniated Disc', 'Cervical Strain', 'Pinched Nerve', 'Torticollis'],
}

const fewConditions = {
  ...baseCategory,
  conditionsTreated: ['Whiplash', 'Cervical Strain'],
}

describe('CategoryCard', () => {
  it('renders the category name', () => {
    render(<CategoryCard category={baseCategory} />)
    expect(screen.getByText('Neck Pain & Injuries')).toBeInTheDocument()
  })

  it('renders the intro text', () => {
    render(<CategoryCard category={baseCategory} />)
    expect(screen.getByText('Treatments for neck conditions.')).toBeInTheDocument()
  })

  it('shows only first 3 conditions initially', () => {
    render(<CategoryCard category={baseCategory} />)
    expect(screen.getByText('Whiplash')).toBeInTheDocument()
    expect(screen.getByText('Herniated Disc')).toBeInTheDocument()
    expect(screen.getByText('Cervical Strain')).toBeInTheDocument()
    expect(screen.queryByText('Pinched Nerve')).not.toBeInTheDocument()
  })

  it('shows a "+N more" toggle when conditions exceed 3', () => {
    render(<CategoryCard category={baseCategory} />)
    expect(screen.getByRole('button', { name: /\+2 more/i })).toBeInTheDocument()
  })

  it('does not show expand button when conditions are 3 or fewer', () => {
    render(<CategoryCard category={fewConditions} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('expands to show all conditions on click', async () => {
    render(<CategoryCard category={baseCategory} />)
    await userEvent.click(screen.getByRole('button', { name: /more/i }))
    expect(screen.getByText('Pinched Nerve')).toBeInTheDocument()
    expect(screen.getByText('Torticollis')).toBeInTheDocument()
  })

  it('shows "Show less" button after expanding', async () => {
    render(<CategoryCard category={baseCategory} />)
    await userEvent.click(screen.getByRole('button', { name: /more/i }))
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument()
  })

  it('collapses back when "Show less" is clicked', async () => {
    render(<CategoryCard category={baseCategory} />)
    await userEvent.click(screen.getByRole('button', { name: /more/i }))
    await userEvent.click(screen.getByRole('button', { name: /show less/i }))
    expect(screen.queryByText('Pinched Nerve')).not.toBeInTheDocument()
  })
})
