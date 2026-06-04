import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Container from '../components/ui/Container'
import type { MedicalRecord, RecordStatus } from '../services/mockApi'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addRecordRequested,
  fetchRecordsRequested,
  resetAddStatus,
} from '../store/medicalSlice'

const RECORD_TYPES = [
  'Physical Therapy',
  'Diagnosis',
  'Injury',
  'Medication',
  'Surgery',
  'Lab Result',
  'Other',
]
const STATUSES: RecordStatus[] = ['Active', 'Ongoing', 'Resolved', 'Scheduled']

const emptyForm = {
  type: RECORD_TYPES[0],
  condition: '',
  provider: '',
  status: 'Active' as RecordStatus,
  notes: '',
}

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const { records, status, error, addStatus, addError } = useAppSelector(
    (state) => state.medical,
  )

  const [form, setForm] = useState(emptyForm)

  // Load this user's history on mount / when the user changes.
  useEffect(() => {
    if (user) dispatch(fetchRecordsRequested({ userId: user.id }))
  }, [dispatch, user])

  // Clear the form after a successful save.
  useEffect(() => {
    if (addStatus === 'success') {
      setForm(emptyForm)
      dispatch(resetAddStatus())
    }
  }, [addStatus, dispatch])

  if (!user) return null // ProtectedRoute guards this, but keep TS happy.

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.condition.trim()) return
    dispatch(addRecordRequested({ userId: user.id, record: form }))
  }

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="min-h-screen bg-cora-light">
      <AnnouncementBar />
      <Header />

      <main id="main" className="py-10 lg:py-14">
        <Container>
          {/* Greeting + logout */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cora-navy sm:text-3xl">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <p className="mt-1 text-sm text-cora-gray">
                Your personal health record and care plan.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="self-start rounded-full border-2 border-cora-blue px-5 py-2 text-sm font-semibold text-cora-blue transition-colors hover:bg-cora-blue hover:text-white"
            >
              Log out
            </button>
          </div>

          {/* Profile summary */}
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-cora-navy/5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cora-gray">
              Patient profile
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <ProfileItem label="Email" value={user.email} />
              <ProfileItem label="Date of birth" value={formatDate(user.dateOfBirth)} />
              <ProfileItem label="Blood type" value={user.bloodType} />
              <ProfileItem label="Primary provider" value={user.primaryProvider} />
            </dl>
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* Add new current medical detail */}
            <section className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-cora-navy/5">
                <h2 className="text-lg font-bold text-cora-navy">Add current medical detail</h2>
                <p className="mt-1 text-sm text-cora-gray">
                  Record a new condition, treatment, or update.
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
                  <Field label="Type">
                    <select
                      value={form.type}
                      onChange={update('type')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    >
                      {RECORD_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Condition / description">
                    <input
                      type="text"
                      required
                      value={form.condition}
                      onChange={update('condition')}
                      placeholder="e.g. Knee pain (left)"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    />
                  </Field>

                  <Field label="Provider">
                    <input
                      type="text"
                      value={form.provider}
                      onChange={update('provider')}
                      placeholder="e.g. Dr. Amara Okafor, DPT"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    />
                  </Field>

                  <Field label="Status">
                    <select
                      value={form.status}
                      onChange={update('status')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    >
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Notes">
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={update('notes')}
                      placeholder="Symptoms, treatment plan, etc."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={addStatus === 'loading'}
                    className="w-full rounded-full bg-cora-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {addStatus === 'loading' ? 'Saving…' : 'Add to my record'}
                  </button>
                </form>
              </div>
            </section>

            {/* Medical history */}
            <section className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-cora-navy/5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-cora-navy">Medical history</h2>
                  <span className="text-sm text-cora-gray">{records.length} records</span>
                </div>

                {status === 'loading' && (
                  <p className="mt-6 text-sm text-cora-gray">Loading your history…</p>
                )}
                {status === 'error' && (
                  <p className="mt-6 text-sm text-red-600">{error}</p>
                )}
                {status === 'success' && records.length === 0 && (
                  <p className="mt-6 text-sm text-cora-gray">
                    No records yet. Add your first detail using the form.
                  </p>
                )}

                <ul className="mt-4 space-y-4">
                  {records.map((record) => (
                    <RecordCard key={record.id} record={record} />
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-cora-gray">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-cora-navy">{value}</dd>
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

const statusStyles: Record<RecordStatus, string> = {
  Active: 'bg-amber-100 text-amber-800',
  Ongoing: 'bg-blue-100 text-blue-800',
  Resolved: 'bg-green-100 text-green-800',
  Scheduled: 'bg-purple-100 text-purple-800',
}

function RecordCard({ record }: { record: MedicalRecord }) {
  return (
    <li className="rounded-xl border border-gray-100 bg-cora-light/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cora-blue">
            {record.type}
          </p>
          <h3 className="mt-0.5 font-semibold text-cora-navy">{record.condition}</h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[record.status]}`}
        >
          {record.status}
        </span>
      </div>
      {record.notes && <p className="mt-2 text-sm text-cora-gray">{record.notes}</p>}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cora-gray">
        <span>{formatDate(record.date)}</span>
        {record.provider && <span>· {record.provider}</span>}
      </div>
    </li>
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
