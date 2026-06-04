import type { Meta, StoryObj } from '@storybook/react'
import OrDivider from './OrDivider'

const meta: Meta<typeof OrDivider> = {
  title: 'UI/OrDivider',
  component: OrDivider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OrDivider>

export const Default: Story = {}
