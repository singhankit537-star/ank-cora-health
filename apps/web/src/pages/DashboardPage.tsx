import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import { Badge, CardGrid } from '../components/ui'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-cora-light">
      <DashboardHeader
        userName={user.name}
        userRole={user.role}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-1 text-2xl font-bold text-cora-navy">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="mb-6 text-cora-gray">Here's a summary of your patient portal.</p>

        <div className="mb-8">
          <Badge role={user.role} />
        </div>

        <CardGrid />
      </main>
    </div>
  )
}
