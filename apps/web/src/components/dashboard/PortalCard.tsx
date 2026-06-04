interface PortalCardProps {
  title: string
  description: string
  badge?: string
}

export default function PortalCard({ title, description, badge = 'Coming soon' }: PortalCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="font-semibold text-cora-navy">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <span className="mt-4 inline-block text-xs font-medium text-cora-sky">{badge}</span>
    </div>
  )
}
