import { fn } from '@storybook/test'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Layout/AnnouncementBar',
  component: AnnouncementBar,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
  args: { onClose: fn() },
}

export const Default = {}
export const WithoutClose = { args: { onClose: undefined } }
