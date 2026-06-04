import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Enable shadow transition on pointer hover.',
      table: { defaultValue: { summary: 'false' } },
    },
    as: {
      control: 'select',
      options: ['div', 'article', 'section', 'li'],
      description: 'Polymorphic HTML tag override.',
      table: { defaultValue: { summary: 'div' } },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p className="p-6 text-sm text-gray-600">Card content goes here.</p>,
  },
}

export const WithHover: Story = {
  name: 'Interactive (hover)',
  args: {
    hover: true,
    children: (
      <p className="p-6 text-sm text-gray-600">Hover me to see the shadow deepen.</p>
    ),
  },
}

export const AsArticle: Story = {
  name: 'Semantic — article',
  args: {
    as: 'article',
    children: <p className="p-6 text-sm text-gray-600">Rendered as an &lt;article&gt;.</p>,
  },
}
