import type { Meta, StoryObj } from '@storybook/react'
import LeaderCard from './LeaderCard'

const meta: Meta<typeof LeaderCard> = {
  title: 'UI/LeaderCard',
  component: LeaderCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className="grid max-w-xs">
        <Story />
      </ul>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LeaderCard>

export const Default: Story = {
  args: {
    name: 'Dr. Amara Okafor, DPT',
    title: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
}
