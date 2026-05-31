import SectionHeading from '@/components/ui/SectionHeading'
import { onBlueBackground } from '../../decorators'

export default {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  args: {
    title: 'Pinpoint Your Pain',
    subtitle: 'See what our patients are saying about us.',
  },
  argTypes: {
    align: { control: 'radio', options: ['center', 'left'] },
    light: { control: 'boolean' },
  },
}

export const Default = {}
export const WithEyebrow = {
  args: { eyebrow: 'Community Referral Program', title: 'Earn While You Help CORA Grow' },
}
export const LeftAligned = { args: { align: 'left' }, parameters: { layout: 'padded' } }
export const OnDarkBackground = {
  args: {
    light: true,
    title: 'Career Opportunities',
    subtitle: 'Feel appreciated. Be supported. And thrive when you join CORA.',
  },
  decorators: [onBlueBackground],
  parameters: { layout: 'fullscreen' },
}
