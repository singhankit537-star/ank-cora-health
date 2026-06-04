import type { Meta, StoryObj } from '@storybook/react'
import DashboardCard from './DashboardCard'

const meta: Meta<typeof DashboardCard> = {
  title: 'Dashboard/DashboardCard',
  component: DashboardCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DashboardCard>

export const Appointments: Story = {
  args: {
    icon: '📅',
    title: 'Appointments',
    description: 'Schedule and manage your upcoming therapy sessions.',
  },
}

export const Locations: Story = {
  args: {
    icon: '📍',
    title: 'Find a Location',
    description: 'Locate your nearest CORA Physical Therapy clinic.',
  },
}

export const Records: Story = {
  args: {
    icon: '📋',
    title: 'Health Records',
    description: 'Access your treatment history and progress notes.',
  },
}
