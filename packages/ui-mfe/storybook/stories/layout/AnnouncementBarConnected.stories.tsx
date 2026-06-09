import AnnouncementBarConnected from '@/components/layout/AnnouncementBarConnected'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Layout/AnnouncementBarConnected',
  component: AnnouncementBarConnected,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const Visible = {}

export const Dismissed = {
  parameters: {
    redux: {
      preloadedState: { ui: { announcementVisible: false } },
    },
  },
}
