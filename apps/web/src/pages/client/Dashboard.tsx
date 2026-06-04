import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { DashboardLayout, PortalCard } from '@cora/ui'

const CLIENT_CARDS = [
  { title: 'My Appointments', description: 'View and manage your upcoming sessions.' },
  { title: 'My Treatment Plan', description: 'Track your progress and goals.' },
  { title: 'Find a Location', description: 'Locate your nearest CORA clinic.' },
]

const ClientDashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 h-1 w-16 rounded-full bg-lime-500" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-cora-navy">
          Welcome back{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">You are signed in as:</p>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-cora-sky/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cora-navy">
            {user?.role ?? 'client'}
          </span>
          <span className="text-sm text-gray-600">{user?.username}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CLIENT_CARDS.map(({ title, description }) => (
          <PortalCard key={title} title={title} description={description} />
        ))}
      </div>
    </DashboardLayout>
  )
}

export default ClientDashboard
