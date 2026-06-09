import Hero from '@/components/sections/Hero'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const Default = {}
