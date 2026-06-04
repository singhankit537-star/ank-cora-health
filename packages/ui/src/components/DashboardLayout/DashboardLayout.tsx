import type { ReactNode } from 'react'

/**
 * Props for the `DashboardLayout` component.
 */
export interface DashboardLayoutProps {
  /** Callback fired when the user clicks the "Log out" button. */
  onLogout: () => void
  /**
   * Optional label displayed next to the CORA logo in the header.
   * Use to differentiate portals, e.g. `"Admin Portal"`.
   */
  portalLabel?: string
  /** Page content rendered inside the constrained main area. */
  children: ReactNode
}

/**
 * Shared shell layout for the patient and admin portal pages.
 *
 * Renders a navy top bar with the CORA logo, an optional portal label, and a
 * "Log out" button.  The `children` are placed inside a centred `<main>`
 * with a light gray background.
 *
 * @example
 * ```tsx
 * <DashboardLayout onLogout={handleLogout} portalLabel="Admin Portal">
 *   <WelcomeCard />
 *   <PortalCardGrid />
 * </DashboardLayout>
 * ```
 */
export default function DashboardLayout({
  onLogout,
  portalLabel,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-cora-navy px-6 py-4 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center">
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
