import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Container from '../components/ui/Container'
import { usePayments } from '../hooks/usePayments'
import type { PaymentRecord } from '../services/mockApi'

const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'Insurance', 'Cash', 'Bank Transfer']
const PAYMENT_STATUSES: PaymentRecord['status'][] = ['Pending', 'Paid', 'Failed']

const emptyForm = {
  description: '',
  amount: '',
  method: PAYMENT_METHODS[0],
  status: 'Pending' as PaymentRecord['status'],
}

const currency = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
})

export default function PaymentHistory() {
  const navigate = useNavigate()

  // All the Redux/saga wiring lives in this one hook now — the component just
  // reads `payments` and calls `addBill`.
  const { payments, status, error, addStatus, addError, addBill, resetAdd } = usePayments()

  const [form, setForm] = useState(emptyForm)

  // Clear the form after a successful save.
  useEffect(() => {
    if (addStatus === 'success') {
      setForm(emptyForm)
      resetAdd()
    }
  }, [addStatus, resetAdd])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const amount = Number.parseFloat(form.amount)
    if (!form.description.trim() || Number.isNaN(amount) || amount <= 0) return
    addBill({
      description: form.description.trim(),
      amount,
      method: form.method,
      status: form.status,
    })
  }

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const totalPaid = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0)
  const outstanding = payments
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0)
console.log('ankit payments ', payments);
  return (
    <div className="min-h-screen bg-cora-light">
      <AnnouncementBar />
      <Header />

      <main id="main" className="py-10 lg:py-14">
        <Container>
          {/* Heading + back to dashboard */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cora-navy sm:text-3xl">Payment history</h1>
              <p className="mt-1 text-sm text-cora-gray">
                Review your bills and record a new payment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="self-start rounded-full border-2 border-cora-blue px-5 py-2 text-sm font-semibold text-cora-blue transition-colors hover:bg-cora-blue hover:text-white"
            >
              ← Back to dashboard
            </button>
          </div>

          {/* Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Total paid" value={currency.format(totalPaid)} tone="green" />
            <SummaryCard
              label="Outstanding"
              value={currency.format(outstanding)}
              tone="amber"
            />
            <SummaryCard label="Bills on file" value={String(payments.length)} tone="blue" />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* Add new bill */}
            <section className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-cora-navy/5">
                <h2 className="text-lg font-bold text-cora-navy">Add a new bill</h2>
                <p className="mt-1 text-sm text-cora-gray">
                  Log a charge or record a payment you&apos;ve made.
                </p>

                {addError && (
                  <div
                    role="alert"
                    className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {addError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <Field label="Description">
                    <input
                      type="text"
                      required
                      value={form.description}
                      onChange={update('description')}
                      placeholder="e.g. Physical therapy session"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    />
                  </Field>

                  <Field label="Amount (USD)">
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      value={form.amount}
                      onChange={update('amount')}
                      placeholder="0.00"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    />
                  </Field>

                  <Field label="Method">
                    <select
                      value={form.method}
                      onChange={update('method')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    >
                      {PAYMENT_METHODS.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Status">
                    <select
                      value={form.status}
                      onChange={update('status')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    >
                      {PAYMENT_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <button
                    type="submit"
                    disabled={addStatus === 'loading'}
                    className="w-full rounded-full bg-cora-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {addStatus === 'loading' ? 'Saving…' : 'Add bill'}
                  </button>
                </form>
              </div>
            </section>

            {/* Payments table */}
            <section className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-cora-navy/5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-cora-navy">Bills &amp; payments</h2>
                  <span className="text-sm text-cora-gray">{payments.length} records</span>
                </div>

                {status === 'loading' && (
                  <p className="mt-6 text-sm text-cora-gray">Loading your payments…</p>
                )}
                {status === 'error' && <p className="mt-6 text-sm text-red-600">{error}</p>}
                {status === 'success' && payments.length === 0 && (
                  <p className="mt-6 text-sm text-cora-gray">
                    No bills yet. Add your first one using the form.
                  </p>
                )}

                {payments.length > 0 && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-cora-gray">
                          <th className="py-2 pr-3 font-medium">Date</th>
                          <th className="py-2 pr-3 font-medium">Description</th>
                          <th className="py-2 pr-3 font-medium">Method</th>
                          <th className="py-2 pr-3 text-right font-medium">Amount</th>
                          <th className="py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id} className="border-b border-gray-100 last:border-0">
                            <td className="whitespace-nowrap py-3 pr-3 text-cora-gray">
                              {formatDate(payment.date)}
                            </td>
                            <td className="py-3 pr-3 font-medium text-cora-navy">
                              {payment.description}
                            </td>
                            <td className="py-3 pr-3 text-cora-gray">{payment.method}</td>
                            <td className="whitespace-nowrap py-3 pr-3 text-right font-semibold text-cora-navy">
                              {currency.format(payment.amount)}
                            </td>
                            <td className="py-3">
                              <StatusBadge status={payment.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'green' | 'amber' | 'blue'
}) {
  const toneStyles: Record<typeof tone, string> = {
    green: 'text-green-700',
    amber: 'text-amber-700',
    blue: 'text-cora-blue',
  }
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-cora-navy/5">
      <p className="text-xs font-medium uppercase tracking-wide text-cora-gray">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${toneStyles[tone]}`}>{value}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-cora-navy">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

const statusStyles: Record<PaymentRecord['status'], string> = {
  Paid: 'bg-green-100 text-green-800',
  Pending: 'bg-amber-100 text-amber-800',
  Failed: 'bg-red-100 text-red-800',
}

function StatusBadge({ status }: { status: PaymentRecord['status'] }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

function formatDate(iso: string): string {
  // Parse as local date to avoid TZ shifting the day.
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
