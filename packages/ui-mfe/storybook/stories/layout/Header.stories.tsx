import { Header } from '@/components/layout/Header'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const Default = {}
