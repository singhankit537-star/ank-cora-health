/** Service category grouping key. */
export type ServiceCategory =
  | 'physical-therapy'
  | 'rehabilitation'
  | 'sports-medicine'
  | 'wellness'

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  'physical-therapy': 'Physical Therapy',
  rehabilitation: 'Rehabilitation',
  'sports-medicine': 'Sports Medicine',
  wellness: 'Wellness',
}

/** Data shape for a single CORA service offering. */
export interface Service {
  /** Unique identifier used as a React key. */
  id: string
  /** Display name of the service. */
  name: string
  /** One-paragraph description of the service. */
  description: string
  /** Grouping category — drives the eyebrow label colour. */
  category: ServiceCategory
  /**
   * Emoji or icon character shown in the avatar circle.
   * Prefer a single emoji for visual consistency.
   */
  icon: string
}

/**
 * Props for the `ServiceCard` component.
 */
export interface ServiceCardProps {
  /** Service data to display. */
  service: Service
}

/**
 * Information card for a single CORA service offering.
 *
 * Displays a coloured category eyebrow, a service name as a heading, and a
 * short description paragraph.  The `icon` is rendered inside a tinted circle
 * avatar.
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-cora-sky/20 text-2xl"
          aria-hidden="true"
        >
          {service.icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-cora-sky">
          {CATEGORY_LABELS[service.category]}
        </span>
      </div>
      <h2 className="font-semibold text-cora-navy">{service.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{service.description}</p>
    </article>
  )
}
