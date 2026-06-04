import type { Meta, StoryObj } from '@storybook/react'
import CategoryCard from './CategoryCard'

const meta: Meta<typeof CategoryCard> = {
  title: 'UI/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CategoryCard>

export const Default: Story = {
  args: {
    category: {
      slug: 'neck-pain',
      name: 'Neck Pain & Injuries',
      intro: 'Our physical therapists specialize in treating a range of neck conditions that cause pain, stiffness, and limited mobility.',
      conditionsTreated: ['Cervical Disc Disease', 'Cervical Radiculopathy', 'Whiplash', 'Torticollis', 'Cervicogenic Headaches'],
    },
  },
}

export const FewConditions: Story = {
  args: {
    category: {
      slug: 'hip-pain',
      name: 'Hip Pain',
      intro: 'Hip pain affects your entire lower body.',
      conditionsTreated: ['Hip Bursitis', 'Labral Tear'],
    },
  },
}
