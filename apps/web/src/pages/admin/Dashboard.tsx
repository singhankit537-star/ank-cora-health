import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { DashboardLayout, PortalCard } from '@cora/ui'

const ADMIN_CARDS = [
  { title: 'Manage Locations', description: 'View and update clinic locations.' },
  { title: 'User Management', description: 'Review registered client accounts.' },
  { title: 'Reports', description: 'View appointment and usage reports.' },
]

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <DashboardLayout onLogout={handleLogout} portalLabel="Admin Portal">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-bold text-cora-navy">
          Admin Panel{user?.name ? ` — ${user.name}` : ''}
        </h1>
        <p className="mt-1 text-sm text-gray-500">You have administrative access.</p>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-700">
            {user?.role ?? 'admin'}
          </span>
          <span className="text-sm text-gray-600">{user?.username}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_CARDS.map(({ title, description }) => (
          <PortalCard key={title} title={title} description={description} />
        ))}
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
