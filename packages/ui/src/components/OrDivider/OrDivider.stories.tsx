import type { Meta, StoryObj } from '@storybook/react'
import OrDivider from './OrDivider'
import Button from '../Button/Button'

const meta = {
  title: 'UI/OrDivider',
  component: OrDivider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof OrDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    () => (
      <div className="flex w-72 flex-col gap-3">
        <Button>Primary action</Button>
        <OrDivider />
        <Button variant="outline">Secondary action</Button>
      </div>
    ),
  ],
}

export const Standalone: Story = {
  decorators: [() => <div className="w-72"><OrDivider /></div>],
}
