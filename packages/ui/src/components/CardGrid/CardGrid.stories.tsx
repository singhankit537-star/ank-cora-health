import type { Meta, StoryObj } from '@storybook/react'
import CardGrid from './CardGrid'

const meta = {
  title: 'Dashboard/CardGrid',
  component: CardGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CardGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
