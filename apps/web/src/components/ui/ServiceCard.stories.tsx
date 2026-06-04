import type { Meta, StoryObj } from '@storybook/react'
import ServiceCard from './ServiceCard'

const meta: Meta<typeof ServiceCard> = {
  title: 'UI/ServiceCard',
  component: ServiceCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ServiceCard>

export const PhysicalTherapy: Story = {
  args: {
    service: {
      id: 'pt',
      name: 'Physical Therapy',
      description: 'Evidence-based treatment to restore movement, reduce pain, and prevent future injury through targeted exercise and manual therapy.',
      category: 'physical-therapy',
      icon: '🏃',
    },
  },
}

export const Telehealth: Story = {
  args: {
    service: {
      id: 'telehealth',
      name: 'Telehealth',
      description: 'Remote physical therapy sessions via video — same expert care from the comfort of your home.',
      category: 'physical-therapy',
      icon: '💻',
    },
  },
}

export const SportsMedicine: Story = {
  args: {
    service: {
      id: 'sports-medicine',
      name: 'Sports Medicine',
      description: 'Specialized care for athletes — from injury prevention and performance optimization to post-surgery recovery.',
      category: 'sports-medicine',
      icon: '⚽',
    },
  },
}
