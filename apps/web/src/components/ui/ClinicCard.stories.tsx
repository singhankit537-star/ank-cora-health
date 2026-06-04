import type { Meta, StoryObj } from '@storybook/react'
import ClinicCard from './ClinicCard'

const meta: Meta<typeof ClinicCard> = {
  title: 'UI/ClinicCard',
  component: ClinicCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ClinicCard>

export const Default: Story = {
  args: {
    clinic: {
      city: 'Jacksonville',
      state: 'Florida',
      address: ['6100 Kennerly Rd.', 'Suite 201', 'Jacksonville, FL 32216'],
      phone: '(904) 739-9901',
      lat: 30.27,
      lng: -81.5,
    },
  },
}

export const Miami: Story = {
  args: {
    clinic: {
      city: 'Miami',
      state: 'Florida',
      address: ['1500 San Remo Ave.', 'Coral Gables, FL 33146'],
      phone: '(305) 551-4400',
      lat: 25.77,
      lng: -80.19,
    },
  },
}
