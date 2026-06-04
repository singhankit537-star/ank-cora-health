import type { Meta, StoryObj } from '@storybook/react'
import DashboardCard from './DashboardCard'

const meta = {
  title: 'Dashboard/DashboardCard',
  component: DashboardCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'gray' } },
  decorators: [(Story) => <div className="w-56"><Story /></div>],
  argTypes: {
    icon: { control: 'text', description: 'Emoji or character icon.' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof DashboardCard>

export default meta
type Story = StoryObj<typeof meta>

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
