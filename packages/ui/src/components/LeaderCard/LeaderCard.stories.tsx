import type { Meta, StoryObj } from '@storybook/react'
import LeaderCard from './LeaderCard'

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`

const meta = {
  title: 'UI/LeaderCard',
  component: LeaderCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <ul className="w-56"><Story /></ul>],
  argTypes: {
    name: { control: 'text' },
    title: { control: 'text' },
    image: { control: 'text' },
  },
} satisfies Meta<typeof LeaderCard>

export default meta
type Story = StoryObj<typeof meta>

export const CEO: Story = {
  args: {
    name: 'Dr. Amara Okafor, DPT',
    title: 'Chief Executive Officer',
    image: portrait('1573496359142-b8d87734a5a2'),
  },
}

export const CFO: Story = {
  args: {
    name: 'Daniel Whitaker',
    title: 'President, Finance & Chief Financial Officer',
    image: portrait('1560250097-0b93528c311a'),
  },
}

export const LongTitle: Story = {
  name: 'Long title wrapping',
  args: {
    name: 'Priya Nair, PT',
    title: 'Executive Vice President, Chief Compliance & Clinical Officer',
    image: portrait('1580489944761-15a19d654956'),
  },
}
