import type { User } from '../../types/auth'

interface DashboardHeaderProps {
  userName: string
  userRole: User['role']
  onLogout: () => void
}

export default function DashboardHeader({ userName, userRole, onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-cora-navy px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <span className="text-xl font-bold text-white">CORA</span>
          <span className="ml-1 text-xl font-light text-cora-teal">Health</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-cora-sky">
            {userRole === 'admin' && <span aria-hidden="true">🩺 </span>}
            {userName}
          </span>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
