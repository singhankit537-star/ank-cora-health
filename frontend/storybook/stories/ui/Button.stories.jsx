import { fn } from 'storybook/test'
import Button from '@/components/ui/Button'

/** @type { import('@storybook/react-vite').Meta<typeof Button> } */
export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'white'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    href: { control: 'text' },
  },
  args: { children: 'Schedule An Appointment', onClick: fn() },
}

export const Primary = { args: { variant: 'primary' } }
export const Secondary = { args: { variant: 'secondary', children: 'See Locations' } }
export const Outline = { args: { variant: 'outline', children: 'Learn More' } }
export const Ghost = { args: { variant: 'ghost', children: 'See All Locations' } }

export const WhiteOnBlue = {
  args: { variant: 'white', children: 'Learn More' },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-cora-blue p-8">
        <Story />
      </div>
    ),
  ],
}

export const Small = { args: { size: 'sm', children: 'Contact' } }
export const Large = { args: { size: 'lg' } }
export const AsLink = { args: { href: '#appointment', variant: 'primary' } }

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}
