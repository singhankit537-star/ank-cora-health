import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  onLogout: () => void
  portalLabel?: string
  children: ReactNode
}

export default function DashboardLayout({ onLogout, portalLabel, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-cora-navy px-6 py-4 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <span className="text-xl font-bold">CORA</span>
            <span className="ml-1 text-xl font-light opacity-80">Health</span>
            {portalLabel && (
              <span className="ml-3 rounded bg-white/10 px-2 py-0.5 text-xs font-medium">
                {portalLabel}
              </span>
            )}
          </div>
          <button
            onClick={onLogout}
            aria-label="Log out"
            className="rounded-lg border border-white/30 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">{children}</main>
    </div>
  )
}
