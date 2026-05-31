import Testimonials from '@/components/sections/Testimonials'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Sections/Testimonials',
  component: Testimonials,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const Default = {}

export const SecondTestimonial = {
  parameters: {
    redux: { preloadedState: { testimonials: { activeIndex: 1 } } },
  },
}
