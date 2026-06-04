import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const StringOptions: Story = {
  name: 'String options',
  args: {
    label: 'State',
    options: ['Florida', 'Georgia', 'North Carolina', 'South Carolina'],
  },
}

export const ObjectOptions: Story = {
  name: 'Object options',
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

export const Unlabelled: Story = {
  name: 'No label',
  args: {
    options: ['Option A', 'Option B', 'Option C'],
  },
}

export const Disabled: Story = {
  args: {
    label: 'Location',
    options: ['Tampa', 'Miami'],
    disabled: true,
  },
}
