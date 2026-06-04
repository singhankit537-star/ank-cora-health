/**
 * Props for the `PortalCard` component.
 */
export interface PortalCardProps {
  /** Card heading — the name of the portal feature. */
  title: string
  /** Short description of what this feature does or will do. */
  description: string
  /**
   * Badge text rendered below the description.
   * Use to indicate availability status such as "Coming soon".
   * @default 'Coming soon'
   */
  badge?: string
}

/**
 * Placeholder feature card used in the patient and admin portal dashboards.
 *
 * Displays a title, description, and a status badge.  Typically rendered
 * inside a responsive grid of three cards.
 */
export default function PortalCard({ title, description, badge = 'Coming soon' }: PortalCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="font-semibold text-cora-navy">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <span className="mt-4 inline-block text-xs font-medium text-cora-sky">{badge}</span>
    </div>
  )
}
