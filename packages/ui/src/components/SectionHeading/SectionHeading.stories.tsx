import type { Meta, StoryObj } from '@storybook/react'
import SectionHeading from './SectionHeading'

const meta = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    align: {
      control: 'radio',
      options: ['center', 'left'],
      description: 'Text alignment of the heading block.',
      table: { defaultValue: { summary: 'center' } },
    },
    light: {
      control: 'boolean',
      description: 'Enable light colour scheme for dark backgrounds.',
      table: { defaultValue: { summary: 'false' } },
    },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
} satisfies Meta<typeof SectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Centred: Story = {
  args: {
    eyebrow: 'Our Services',
    title: 'Comprehensive Physical Therapy',
    subtitle: 'Evidence-based treatment tailored to your unique needs and goals.',
    align: 'center',
  },
}

export const LeftAligned: Story = {
  args: {
    eyebrow: 'Why CORA',
    title: 'Expert Care Close to Home',
    subtitle: 'With 250+ clinics, quality care is always nearby.',
    align: 'left',
  },
}

export const LightOnDark: Story = {
  name: 'Light (on dark background)',
  args: {
    eyebrow: 'Referral Program',
    title: 'Refer a Patient',
    subtitle: 'Help your patients find the physical therapy they need.',
    light: true,
  },
  parameters: { backgrounds: { default: 'navy' } },
}

export const TitleOnly: Story = {
  args: { title: 'Pinpoint Your Pain' },
}
