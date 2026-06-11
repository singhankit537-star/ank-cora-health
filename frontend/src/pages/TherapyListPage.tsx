import { useNavigate } from 'react-router'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import { currencyFormatter as currency, ROUTES } from '@/constants'
import { useTherapies } from '@/hooks/useTherapies'
import type { TherapyPlan } from '@/services/mockApi'

// Shape of the router state we hand to the Pay Bill form so it can prefill the
// "Add a new bill" form. Description ← plan name, Amount ← plan amount.
export interface BuyTherapyState {
  description: string
  amount: number
}

export default function TherapyListPage() {
  const navigate = useNavigate()
  const { data: therapies, isLoading, isError, error } = useTherapies()

  const handleBuy = (plan: TherapyPlan) => {
    const state: BuyTherapyState = { description: plan.name, amount: plan.amount }
    navigate(ROUTES.paymentHistory, { state })
  }

  return (
    <div className="min-h-screen bg-cora-light">
      <AnnouncementBar />
      <Header />

      <main id="main" className="py-10 lg:py-14">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-cora-navy sm:text-3xl">
              Available Therapy Plans
            </h1>
            <p className="mt-1 text-sm text-cora-gray">
              Choose a physical therapy plan that fits your recovery. Click “Buy” to
              record the payment for the plan you want.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-cora-navy/5 sm:p-6">
            {isLoading && (
              <p className="py-8 text-center text-sm text-cora-gray">
                Loading therapy plans…
              </p>
            )}

            {isError && (
              <p role="alert" className="py-8 text-center text-sm text-red-600">
                {error instanceof Error ? error.message : 'Failed to load therapy plans.'}
              </p>
            )}

            {therapies && therapies.length > 0 && (
              <div role="table" className="text-sm">
                {/* Header row — hidden on mobile where each plan renders as a card. */}
                <div
                  role="row"
                  className="hidden border-b border-gray-200 pb-3 text-xs font-medium uppercase tracking-wide text-cora-gray md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center md:gap-4"
                >
                  <span role="columnheader">Therapy Plan Name</span>
                  <span role="columnheader">Therapy Type</span>
                  <span role="columnheader" className="text-right">Amount</span>
                  <span role="columnheader" className="text-right">Therapy Days</span>
                  <span role="columnheader" className="text-right">Action</span>
                </div>

                {therapies.map((plan) => (
                  <div
                    key={plan.id}
                    role="row"
                    className="grid grid-cols-1 gap-2 border-b border-gray-100 py-4 last:border-0 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center md:gap-4"
                  >
                    <span role="cell" className="font-semibold text-cora-navy">
                      <span className="mr-2 text-xs font-medium uppercase text-cora-gray md:hidden">
                        Plan:
                      </span>
                      {plan.name}
                    </span>

                    <span role="cell" className="text-cora-gray">
                      <span className="mr-2 text-xs font-medium uppercase text-cora-gray md:hidden">
                        Type:
                      </span>
                      {plan.type}
                    </span>

                    <span role="cell" className="font-semibold text-cora-navy md:text-right">
                      <span className="mr-2 text-xs font-medium uppercase text-cora-gray md:hidden">
                        Amount:
                      </span>
                      {currency.format(plan.amount)}
                    </span>

                    <span role="cell" className="text-cora-gray md:text-right">
                      <span className="mr-2 text-xs font-medium uppercase text-cora-gray md:hidden">
                        Days:
                      </span>
                      {plan.days} days
                    </span>

                    <span role="cell" className="md:text-right">
                      <button
                        type="button"
                        onClick={() => handleBuy(plan)}
                        className="w-full rounded-full bg-cora-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2 md:w-auto"
                      >
                        Buy
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {therapies && therapies.length === 0 && (
              <p className="py-8 text-center text-sm text-cora-gray">
                No therapy plans available right now.
              </p>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
