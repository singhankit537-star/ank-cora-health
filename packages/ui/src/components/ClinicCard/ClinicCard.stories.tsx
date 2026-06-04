import type { Meta, StoryObj } from '@storybook/react'
import ClinicCard from './ClinicCard'

const meta = {
  title: 'UI/ClinicCard',
  component: ClinicCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
} satisfies Meta<typeof ClinicCard>

export default meta
type Story = StoryObj<typeof meta>

export const SingleLineAddress: Story = {
  args: {
    clinic: {
      city: 'Jacksonville',
      state: 'Florida',
      address: ['6100 Kennerly Rd., Jacksonville, FL 32216'],
      phone: '(904) 739-9901',
      lat: 30.27,
      lng: -81.5,
    },
  },
}

export const MultiLineAddress: Story = {
  args: {
    clinic: {
      city: 'Miami',
      state: 'Florida',
      address: ['1500 San Remo Ave.', 'Suite 101', 'Coral Gables, FL 33146'],
      phone: '(305) 551-4400',
      lat: 25.77,
      lng: -80.19,
    },
  },
}

export const Tampa: Story = {
  args: {
    clinic: {
      city: 'Tampa',
      state: 'Florida',
      address: ['3802 Gunn Hwy.', 'Tampa, FL 33618'],
      phone: '(813) 265-3233',
      lat: 28.07,
      lng: -82.5,
    },
  },
}
