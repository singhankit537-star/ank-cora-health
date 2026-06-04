import type { Meta, StoryObj } from '@storybook/react'
import PageHero from './PageHero'

const meta = {
  title: 'UI/PageHero',
  component: PageHero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
} satisfies Meta<typeof PageHero>

export default meta
type Story = StoryObj<typeof meta>

export const WithSubtitle: Story = {
  args: {
    title: 'What We Treat',
    subtitle:
      'We specialize in treating a wide range of musculoskeletal conditions. Find your area below.',
  },
}

export const TitleOnly: Story = {
  args: { title: 'Meet Our Leadership Team' },
}

export const LongTitle: Story = {
  args: {
    title: 'How We Can Help You Recover and Get Back to Life',
    subtitle: 'Comprehensive physical therapy and rehabilitation services tailored to your needs.',
  },
}
