import HomePage from '@/pages/HomePage'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const FullPage = {}
