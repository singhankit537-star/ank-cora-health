import type { Meta, StoryObj } from '@storybook/react'
import PortalCard from './PortalCard'

const meta: Meta<typeof PortalCard> = {
  title: 'Dashboard/PortalCard',
  component: PortalCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PortalCard>

export const Default: Story = {
  args: {
    title: 'My Appointments',
    description: 'View and manage your upcoming sessions.',
  },
}

export const WithCustomBadge: Story = {
  args: {
    title: 'Reports',
    description: 'View appointment and usage reports.',
    badge: 'Admin only',
  },
}
