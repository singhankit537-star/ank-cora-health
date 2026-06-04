import type { Meta, StoryObj } from '@storybook/react'
import PortalCard from './PortalCard'

const meta = {
  title: 'Dashboard/PortalCard',
  component: PortalCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'gray' } },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    badge: {
      control: 'text',
      description: 'Status badge text.',
      table: { defaultValue: { summary: 'Coming soon' } },
    },
  },
} satisfies Meta<typeof PortalCard>

export default meta
type Story = StoryObj<typeof meta>

export const ComingSoon: Story = {
  args: {
    title: 'My Appointments',
    description: 'View and manage your upcoming sessions.',
  },
}

export const CustomBadge: Story = {
  args: {
    title: 'Reports',
    description: 'View appointment and usage reports.',
    badge: 'Admin only',
  },
}

export const FindLocation: Story = {
  args: {
    title: 'Find a Location',
    description: 'Locate your nearest CORA clinic.',
    badge: 'Available',
  },
}
