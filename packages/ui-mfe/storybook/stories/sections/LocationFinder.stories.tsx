import LocationFinder from '@/components/sections/LocationFinder'
import { fullscreen, fullscreenParameters } from '../../decorators'

export default {
  title: 'Sections/LocationFinder',
  component: LocationFinder,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  decorators: [fullscreen],
}

export const Default = {}

export const WithPrefilledSearch = {
  parameters: {
    redux: {
      preloadedState: {
        location: {
          query: '45806',
          radius: '25',
          resultsLimit: '8',
          isSearching: false,
          hasSearched: true,
        },
      },
    },
  },
}
