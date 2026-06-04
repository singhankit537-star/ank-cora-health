import type { Meta, StoryObj } from '@storybook/react'
import ImageCarousel from './ImageCarousel'

const SAMPLE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?fit=crop',
    alt: 'Physical therapist working with a patient',
  },
  {
    src: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?fit=crop',
    alt: 'Rehabilitation exercise session',
  },
  {
    src: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?fit=crop',
    alt: 'Modern therapy clinic interior',
  },
]

const meta = {
  title: 'UI/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    interval: {
      control: { type: 'number', min: 1000, step: 500 },
      description: 'Milliseconds between auto-advances.',
      table: { defaultValue: { summary: '4000' } },
    },
    autoPlay: {
      control: 'boolean',
      description: 'Enable or disable auto-rotation.',
      table: { defaultValue: { summary: 'true' } },
    },
    prioritizeFirst: {
      control: 'boolean',
      description: 'Set fetchpriority="high" on the first slide (LCP optimisation).',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof ImageCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    images: SAMPLE_IMAGES,
    autoPlay: true,
    interval: 4000,
  },
}

export const AutoPlayOff: Story = {
  args: {
    images: SAMPLE_IMAGES,
    autoPlay: false,
  },
}

export const SingleImage: Story = {
  args: {
    images: [SAMPLE_IMAGES[0]],
    autoPlay: false,
  },
}

export const FastInterval: Story = {
  args: {
    images: SAMPLE_IMAGES,
    autoPlay: true,
    interval: 1500,
  },
}

export const Empty: Story = {
  args: {
    images: [],
  },
}
