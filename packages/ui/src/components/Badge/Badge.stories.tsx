import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    role: {
      control: 'radio',
      options: ['admin', 'client'],
      description: 'User role — drives both the colour scheme and the label.',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Patient: Story = {
  args: { role: 'client' },
}

export const Administrator: Story = {
  args: { role: 'admin' },
}
