import type { Meta, StoryObj } from '@storybook/react'
import TriangleAccent from './TriangleAccent'

const meta = {
  title: 'Layout/TriangleAccent',
  component: TriangleAccent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    flip: {
      control: 'boolean',
      description: 'Rotates the triangle 180° — use to point downward.',
      table: { defaultValue: { summary: 'false' } },
    },
    className: {
      control: 'text',
      description: 'Extra class names applied to the wrapper.',
    },
  },
} satisfies Meta<typeof TriangleAccent>

export default meta
type Story = StoryObj<typeof meta>

export const PointingUp: Story = {
  args: { flip: false },
  decorators: [
    (Story) => (
      <div className="bg-cora-navy">
        <Story />
        <div className="h-16 bg-white" />
      </div>
    ),
  ],
}

export const PointingDown: Story = {
  args: { flip: true },
  decorators: [
    (Story) => (
      <div>
        <div className="h-16 bg-white" />
        <Story />
        <div className="h-16 bg-cora-navy" />
      </div>
    ),
  ],
}
