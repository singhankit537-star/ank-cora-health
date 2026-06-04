export type ServiceCategory = 'physical-therapy' | 'rehabilitation' | 'sports-medicine' | 'wellness'

export interface Service {
  id: string
  name: string
  description: string
  category: ServiceCategory
  icon: string
}

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  'physical-therapy': 'Physical Therapy',
  rehabilitation: 'Rehabilitation',
  'sports-medicine': 'Sports Medicine',
  wellness: 'Wellness',
}

export default function ServiceCard({ service }: { service: Service }) {
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
