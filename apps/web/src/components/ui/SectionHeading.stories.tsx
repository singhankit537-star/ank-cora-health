import type { Meta, StoryObj } from '@storybook/react'
import SectionHeading from './SectionHeading'

const meta: Meta<typeof SectionHeading> = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'radio', options: ['center', 'left'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionHeading>

export const Default: Story = {
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

export const LightVariant: Story = {
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
