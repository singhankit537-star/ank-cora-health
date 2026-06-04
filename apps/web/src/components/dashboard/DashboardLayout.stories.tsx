import type { Meta, StoryObj } from '@storybook/react'
import DashboardLayout from './DashboardLayout'

const meta: Meta<typeof DashboardLayout> = {
  title: 'Dashboard/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof DashboardLayout>

export const ClientPortal: Story = {
  args: {
    onLogout: () => alert('Logged out'),
    children: <p className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 text-sm text-gray-600">Page content goes here.</p>,
  },
}

export const AdminPortal: Story = {
  args: {
    onLogout: () => alert('Logged out'),
    portalLabel: 'Admin Portal',
    children: <p className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 text-sm text-gray-600">Admin content goes here.</p>,
  },
}
