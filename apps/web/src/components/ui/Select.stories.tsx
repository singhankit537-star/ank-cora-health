import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: ['Florida', 'Georgia', 'North Carolina', 'South Carolina'],
  },
}

export const WithLabel: Story = {
  args: {
    label: 'State',
    options: ['Florida', 'Georgia', 'North Carolina'],
  },
}

export const WithObjectOptions: Story = {
  args: {
    label: 'Insurance Provider',
    options: [
      { value: 'bcbs', label: 'Blue Cross Blue Shield' },
      { value: 'aetna', label: 'Aetna' },
      { value: 'cigna', label: 'Cigna' },
      { value: 'humana', label: 'Humana' },
    ],
  },
}
