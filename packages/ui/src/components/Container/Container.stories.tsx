import type { Meta, StoryObj } from '@storybook/react'
import Container from './Container'

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'narrow', 'wide'],
      description: 'Max-width preset for the container.',
      table: { defaultValue: { summary: 'default' } },
    },
    as: {
      control: 'text',
      description: 'HTML element to render as.',
      table: { defaultValue: { summary: 'div' } },
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

const Placeholder = () => (
  <div className="rounded bg-cora-sky/20 px-4 py-6 text-center text-sm text-cora-navy">
    Container content
  </div>
)

export const Default: Story = {
  args: { size: 'default', children: <Placeholder /> },
}

export const Narrow: Story = {
  args: { size: 'narrow', children: <Placeholder /> },
}

export const Wide: Story = {
  args: { size: 'wide', children: <Placeholder /> },
}

export const AsSection: Story = {
  args: { as: 'section', size: 'default', children: <Placeholder /> },
}
