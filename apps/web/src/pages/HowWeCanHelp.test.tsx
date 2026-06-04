import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HowWeCanHelp from './HowWeCanHelp'

describe('HowWeCanHelp', () => {
  it('renders at least 6 service cards', () => {
    render(<HowWeCanHelp />)
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(6)
  })

  it('renders the page heading', () => {
    render(<HowWeCanHelp />)
    expect(screen.getByRole('heading', { name: /how we can help/i, level: 1 })).toBeInTheDocument()
  })

  it('shows Physical Therapy service heading', () => {
    render(<HowWeCanHelp />)
    expect(screen.getByRole('heading', { name: 'Physical Therapy' })).toBeInTheDocument()
  })
})
