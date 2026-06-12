import { useNavigate } from 'react-router'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import { currencyFormatter as currency, ROUTES } from '@/constants'
import { useTherapies } from '@/hooks/useTherapies'
import type { TherapyPlan } from '@/services/mockApi'
import type { BuyTherapyState } from '@/types/payment'

export default function TherapyListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useTherapies()
  const therapies = data ?? []

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

            {!isLoading && !isError && therapies.length === 0 && (
              <p className="py-8 text-center text-sm text-cora-gray">
                No therapy plans available right now.
              </p>
            )}

            {therapies.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-cora-gray">
                      <th className="py-2 pr-3 font-medium">Therapy Plan Name</th>
                      <th className="py-2 pr-3 font-medium">Therapy Type</th>
                      <th className="py-2 pr-3 text-right font-medium">Amount</th>
                      <th className="py-2 pr-3 text-right font-medium">Therapy Days</th>
                      <th className="py-2 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {therapies.map((plan) => (
                      <tr key={plan.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 pr-3 font-semibold text-cora-navy">{plan.name}</td>
                        <td className="py-3 pr-3 text-cora-gray">{plan.type}</td>
                        <td className="whitespace-nowrap py-3 pr-3 text-right font-semibold text-cora-navy">
                          {currency.format(plan.amount)}
                        </td>
                        <td className="whitespace-nowrap py-3 pr-3 text-right text-cora-gray">
                          {plan.days} days
                        </td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleBuy(plan)}
                            className="rounded-full bg-cora-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2"
                          >
                            Buy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
