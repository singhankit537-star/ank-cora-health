import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'white'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Schedule An Appointment', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { children: 'Learn More', variant: 'secondary', size: 'md' },
}

export const Outline: Story = {
  args: { children: 'See Locations', variant: 'outline', size: 'md' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost', size: 'md' },
}

export const White: Story = {
  args: { children: 'View All', variant: 'white', size: 'md' },
  parameters: { backgrounds: { default: 'navy' } },
}

export const Small: Story = {
  args: { children: 'Small Button', variant: 'primary', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Large Button', variant: 'primary', size: 'lg' },
}

export const AsLink: Story = {
  args: { children: 'Go to Page', variant: 'primary', href: '#' },
}
