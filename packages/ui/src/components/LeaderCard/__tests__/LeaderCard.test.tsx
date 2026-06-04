import { render, screen } from '@testing-library/react'
import LeaderCard from '../LeaderCard'

const leader = {
  name: 'Jane Smith',
  title: 'Chief Executive Officer',
  image: '/images/jane-smith.jpg',
}

describe('LeaderCard', () => {
  it('renders inside a list item', () => {
    render(
      <ul>
        <LeaderCard {...leader} />
      </ul>
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('renders the leader name', () => {
    render(
      <ul>
        <LeaderCard {...leader} />
      </ul>
    )
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('renders the leader title', () => {
    render(
      <ul>
        <LeaderCard {...leader} />
      </ul>
    )
    expect(screen.getByText('Chief Executive Officer')).toBeInTheDocument()
  })

  it('renders the image with correct src and alt', () => {
    render(
      <ul>
        <LeaderCard {...leader} />
      </ul>
    )
    const img = screen.getByRole('img', { name: 'Jane Smith' })
    expect(img).toHaveAttribute('src', '/images/jane-smith.jpg')
    expect(img).toHaveAttribute('alt', 'Jane Smith')
  })
})
