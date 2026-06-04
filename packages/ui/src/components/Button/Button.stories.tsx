import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onClick: action('clicked') },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'white'],
      description: 'Visual style of the button.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset controlling padding and font size.',
      table: { defaultValue: { summary: 'md' } },
    },
    href: {
      control: 'text',
      description: 'When set, renders as an `<a>` tag for navigation.',
    },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

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
  args: { children: 'Small', variant: 'primary', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Get Started Today', variant: 'primary', size: 'lg' },
}

export const AsLink: Story = {
  args: { children: 'Find a Location', variant: 'primary', href: '#' },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', variant: 'primary', disabled: true },
}
