import NewsSection from '@/components/sections/NewsSection'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Sections/NewsSection',
  component: NewsSection,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const Default = {}
