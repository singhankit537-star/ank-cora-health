import type { User } from '../../types/auth'

interface BadgeProps {
  role: User['role']
}

export default function Badge({ role }: BadgeProps) {
  const isAdmin = role === 'admin'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isAdmin ? 'bg-cora-orange/10 text-cora-orange' : 'bg-cora-teal/10 text-cora-teal'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-cora-orange' : 'bg-cora-teal'}`}
        aria-hidden="true"
      />
      {isAdmin ? 'Administrator' : 'Patient'}
    </span>
  )
}
