import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Toggle from './Toggle'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onChange: action('changed') },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled on/off state.',
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  args: { checked: false, label: 'Have you seen a doctor?' },
}

export const On: Story = {
  args: { checked: true, label: 'Have you seen a doctor?' },
}

export const Disabled: Story = {
  args: { checked: false, label: 'Notifications (disabled)', disabled: true },
}
