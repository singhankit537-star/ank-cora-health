import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import DashboardLayout from './DashboardLayout'
import PortalCard from '../PortalCard/PortalCard'

const meta = {
  title: 'Dashboard/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { onLogout: action('logout clicked') },
  argTypes: {
    portalLabel: {
      control: 'text',
      description: 'Label displayed next to the logo — e.g. "Admin Portal".',
    },
    onLogout: { action: 'logout clicked' },
  },
} satisfies Meta<typeof DashboardLayout>

export default meta
type Story = StoryObj<typeof meta>

const SampleCards = () => (
  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <PortalCard title="My Appointments" description="View and manage your upcoming sessions." />
    <PortalCard title="My Treatment Plan" description="Track your progress and goals." />
    <PortalCard title="Find a Location" description="Locate your nearest CORA clinic." />
  </div>
)

export const ClientPortal: Story = {
  args: {
    children: (
      <>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <h1 className="text-2xl font-bold text-cora-navy">Welcome back, Jane!</h1>
          <p className="mt-1 text-sm text-gray-500">You are signed in as a patient.</p>
        </div>
        <SampleCards />
      </>
    ),
  },
}

export const AdminPortal: Story = {
  args: {
    portalLabel: 'Admin Portal',
    children: (
      <>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <h1 className="text-2xl font-bold text-cora-navy">Admin Panel — Admin User</h1>
          <p className="mt-1 text-sm text-gray-500">You have administrative access.</p>
        </div>
        <SampleCards />
      </>
    ),
  },
}

export const NoChildren: Story = {
  name: 'Empty shell',
  args: { children: null },
}
