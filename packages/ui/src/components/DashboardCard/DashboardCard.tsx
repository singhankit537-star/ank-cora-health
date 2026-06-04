/**
 * Props for the `DashboardCard` component.
 */
export interface DashboardCardProps {
  /**
   * Emoji or single-character icon displayed above the heading.
   * Kept `aria-hidden` — do not rely on it to convey meaning.
   */
  icon: string
  /** Card heading — the name of the dashboard feature or metric. */
  title: string
  /** Short supporting description of the card's purpose. */
  description: string
}

/**
 * Icon-driven feature card used in the main patient portal dashboard grid.
 *
 * The `icon` is decorative; ensure `title` and `description` alone make
 * the card's purpose clear for screen reader users.
 */
export default function DashboardCard({ icon, title, description }: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="mb-3 text-2xl" aria-hidden="true">
        {icon}
      </div>
      <h2 className="font-semibold text-cora-navy">{title}</h2>
      <p className="mt-1 text-sm text-cora-gray">{description}</p>
    </div>
  )
}
