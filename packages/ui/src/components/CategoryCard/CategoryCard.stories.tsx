import type { Meta, StoryObj } from '@storybook/react'
import CategoryCard from './CategoryCard'

const meta = {
  title: 'UI/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof CategoryCard>

export default meta
type Story = StoryObj<typeof meta>

export const WithExpandToggle: Story = {
  name: 'Many conditions (expandable)',
  args: {
    category: {
      slug: 'neck-pain',
      name: 'Neck Pain & Injuries',
      intro:
        'Our physical therapists specialize in treating a range of neck conditions that cause pain, stiffness, and limited mobility.',
      conditionsTreated: [
        'Cervical Disc Disease',
        'Cervical Radiculopathy',
        'Whiplash',
        'Torticollis',
        'Cervicogenic Headaches',
      ],
    },
  },
}

export const FewConditions: Story = {
  name: 'Few conditions (no toggle)',
  args: {
    category: {
      slug: 'hip-pain',
      name: 'Hip Pain',
      intro: 'Hip pain affects your entire lower body.',
      conditionsTreated: ['Hip Bursitis', 'Labral Tear'],
    },
  },
}

export const ExactlyAtLimit: Story = {
  name: 'Exactly 3 conditions (no toggle)',
  args: {
    category: {
      slug: 'ankle',
      name: 'Ankle & Foot',
      intro: 'Restore mobility and prevent re-injury.',
      conditionsTreated: ['Ankle Sprain', 'Plantar Fasciitis', 'Achilles Tendinitis'],
    },
  },
}
