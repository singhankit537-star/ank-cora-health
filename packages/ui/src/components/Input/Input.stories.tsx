import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    label: { control: 'text', description: 'Optional label rendered above the input.' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'search'],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Enter text…' },
}

export const WithLabel: Story = {
  args: { label: 'Username', placeholder: 'e.g. client1' },
}

export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: '••••••••' },
}

export const Disabled: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', disabled: true },
}

export const WithError: Story = {
  name: 'Error state',
  args: {
    label: 'Username',
    placeholder: 'e.g. client1',
    className: 'border-red-500 focus:border-red-500 focus:ring-red-300',
  },
}
