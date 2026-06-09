import type { createLocationsApi } from './locations';
import type { createServicesApi } from './services';
import type { createTestimonialsApi } from './testimonials';
import type { HomePageData } from '../types';

export function createHomepageApi(
  services: ReturnType<typeof createServicesApi>,
  locations: ReturnType<typeof createLocationsApi>,
  testimonials: ReturnType<typeof createTestimonialsApi>,
) {
  return {
    async getHomePageData(): Promise<HomePageData> {
      const [servicesData, locationsData, testimonialsData] = await Promise.all([
        services.getServices(),
        locations.getLocations(),
        testimonials.getTestimonials(),
      ]);

      return {
        services: servicesData,
        locations: locationsData,
        testimonials: testimonialsData,
      };
    },
  };
}
