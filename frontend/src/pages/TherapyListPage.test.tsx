import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TherapyListPage from './TherapyListPage'
import type { BuyTherapyState } from '@/types/payment'

// Stub the public catalogue so tests are deterministic and don't wait on the
// mock API's artificial latency.
vi.mock('@/services/mockApi', () => ({
  getTherapies: () =>
    Promise.resolve([
      { id: 't1', name: 'Physical Therapy — Starter', type: 'Physical Therapy', amount: 150, days: 5 },
      { id: 't2', name: 'Dry Needling Package', type: 'Dry Needling', amount: 200, days: 6 },
    ]),
}))

// Renders whatever was passed in router state so we can assert the Buy flow
// hands the chosen plan to the Pay Bill form.
function PayBillStub() {
  const state = useLocation().state as BuyTherapyState | null
  return (
    <div>
      pay-bill: {state?.description} / {state?.amount}
    </div>
  )
}

function renderPage() {
  // Fresh client per test; no retries so errors surface immediately.
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/therapies']}>
        <Routes>
          <Route path="/therapies" element={<TherapyListPage />} />
          <Route path="/payment-history" element={<PayBillStub />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('TherapyListPage', () => {
  it('renders the fetched therapy plans in a table', async () => {
    renderPage()

    // Column headers.
    expect(
      await screen.findByRole('columnheader', { name: /therapy plan name/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /therapy type/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /amount/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /therapy days/i })).toBeInTheDocument()

    // Row data.
    expect(screen.getByText('Physical Therapy — Starter')).toBeInTheDocument()
    expect(screen.getByText('Dry Needling Package')).toBeInTheDocument()
    expect(screen.getByText('5 days')).toBeInTheDocument()

    // One Buy button per plan.
    expect(screen.getAllByRole('button', { name: /buy/i })).toHaveLength(2)
  })

  it('navigates to the Pay Bill form with the plan name and amount on Buy', async () => {
    const user = userEvent.setup()
    renderPage()

    const buyButtons = await screen.findAllByRole('button', { name: /buy/i })
    await user.click(buyButtons[0])

    // The stub destination receives description ← name, amount ← amount.
    expect(
      await screen.findByText(/pay-bill: Physical Therapy — Starter \/ 150/),
    ).toBeInTheDocument()
  })
})
