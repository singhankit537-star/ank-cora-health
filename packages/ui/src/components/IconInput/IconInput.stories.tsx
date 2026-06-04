import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import IconInput from './IconInput'

const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
  </svg>
)

const PinIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.16 7-11a7 7 0 10-14 0c0 4.84 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const LocateIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
)

const meta = {
  title: 'UI/IconInput',
  component: IconInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof IconInput>

export default meta
type Story = StoryObj<typeof meta>

export const SearchField: Story = {
  args: {
    icon: <SearchIcon />,
    placeholder: 'Type of Therapy',
    'aria-label': 'Type of Therapy',
  },
}

export const LocationWithAction: Story = {
  name: 'With trailing action',
  args: {
    icon: <PinIcon />,
    placeholder: 'City, State or Zip Code',
    'aria-label': 'City, State or Zip Code',
    trailing: (
      <button
        type="button"
        aria-label="Use my location"
        onClick={action('use my location')}
        className="text-cora-teal hover:text-cora-blue"
      >
        <LocateIcon />
      </button>
    ),
  },
}

export const Disabled: Story = {
  args: {
    icon: <SearchIcon />,
    placeholder: 'Unavailable',
    disabled: true,
  },
}
