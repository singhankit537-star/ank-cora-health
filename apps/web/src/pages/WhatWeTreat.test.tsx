import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WhatWeTreat from './WhatWeTreat'

describe('WhatWeTreat', () => {
  it('renders at least 5 category cards', () => {
    render(<WhatWeTreat />)
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(5)
  })

  it('renders the page heading', () => {
    render(<WhatWeTreat />)
    expect(screen.getByRole('heading', { name: /what we treat/i, level: 1 })).toBeInTheDocument()
  })

  it('expands card to show more conditions', async () => {
    const user = userEvent.setup()
    render(<WhatWeTreat />)

    const expandBtns = screen.getAllByRole('button', { name: /\+\d+ more/i })
    expect(expandBtns.length).toBeGreaterThan(0)

    await user.click(expandBtns[0])
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument()
  })
})
