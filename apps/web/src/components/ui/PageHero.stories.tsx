import type { Meta, StoryObj } from '@storybook/react'
import PageHero from './PageHero'

const meta: Meta<typeof PageHero> = {
  title: 'UI/PageHero',
  component: PageHero,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageHero>

export const Default: Story = {
  args: {
    title: 'What We Treat',
    subtitle: 'We specialize in treating a wide range of musculoskeletal conditions.',
  },
}

export const TitleOnly: Story = {
  args: { title: 'Meet Our Team' },
}
