import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: <p className="p-4 text-sm text-gray-600">Card content goes here.</p>,
    hover: false,
  },
}

export const WithHover: Story = {
  args: {
    children: <p className="p-4 text-sm text-gray-600">Hover over me!</p>,
    hover: true,
  },
}

export const AsArticle: Story = {
  args: {
    as: 'article',
    children: <p className="p-4 text-sm text-gray-600">Rendered as an article element.</p>,
  },
}
