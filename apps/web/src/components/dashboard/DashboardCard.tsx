interface DashboardCardProps {
  title: string
  description: string
  icon: string
}

export default function DashboardCard({ title, description, icon }: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="mb-3 text-2xl" aria-hidden="true">{icon}</div>
      <h2 className="font-semibold text-cora-navy">{title}</h2>
      <p className="mt-1 text-sm text-cora-gray">{description}</p>
    </div>
  )
}
