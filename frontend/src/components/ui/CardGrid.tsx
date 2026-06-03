import DashboardCard from '../dashboard/DashboardCard'

const CARDS = [
  { icon: '📅', title: 'My Appointments', description: 'View and manage upcoming visits' },
  { icon: '📋', title: 'My Records', description: 'Access your health history' },
  { icon: '📍', title: 'Find a Location', description: 'Locate your nearest CORA clinic' },
  { icon: '💳', title: 'Billing', description: 'Review invoices and payments' },
  { icon: '💬', title: 'Messages', description: 'Communicate with your care team' },
  { icon: '⚙️', title: 'Settings', description: 'Update your profile and preferences' },
]

export default function CardGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CARDS.map(card => (
        <DashboardCard key={card.title} {...card} />
      ))}
    </div>
  )
}
