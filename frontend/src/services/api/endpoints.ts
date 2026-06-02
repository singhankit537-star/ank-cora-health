/**
 * API endpoints and methods
 * Demonstrates Promise.all and Promise.allSettled usage
 */

import { mockServices, mockLocations, mockTestimonials } from './mockData';
import type { Service, Location, Testimonial } from '@/types';

/**
 * Service endpoints
 */
export const servicesApi = {
  /**
   * Fetch all services (mocked for demo)
   */
  async getServices(): Promise<Service[]> {
    // In production, this would be:
    // const response = await apiClient.get<Service[]>('/services');
    // return response.data || [];

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices), 500);
    });
  },

  /**
   * Fetch single service
   */
  async getService(id: string): Promise<Service | null> {
    const services = await this.getServices();
    return services.find((s) => s.id === id) || null;
  },
};

/**
 * Location endpoints
 */
export const locationsApi = {
  /**
   * Fetch all locations (mocked for demo)
   */
  async getLocations(): Promise<Location[]> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLocations), 500);
    });
  },

  /**
   * Fetch single location
   */
  async getLocation(id: string): Promise<Location | null> {
    const locations = await this.getLocations();
    return locations.find((l) => l.id === id) || null;
  },
};

/**
 * Testimonials endpoints
 */
export const testimonialsApi = {
  /**
   * Fetch all testimonials (mocked for demo)
   */
  async getTestimonials(): Promise<Testimonial[]> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTestimonials), 500);
    });
  },
};

/**
 * COMPOSITE API: Fetch all homepage data in parallel using Promise.all
 * This ensures all data loads together or fails together
 */
export const homepageApi = {
  async getHomePageData(): Promise<{
    services: Service[];
    locations: Location[];
    testimonials: Testimonial[];
  }> {
    try {
      const [services, locations, testimonials] = await Promise.all([
        servicesApi.getServices(),
        locationsApi.getLocations(),
        testimonialsApi.getTestimonials(),
      ]);

      return {
        services,
        locations,
        testimonials,
      };
    } catch (error) {
      throw new Error(`Failed to load homepage data: ${(error as Error).message}`);
    }
  },
};

/**
 * RESILIENT API: Fetch location details using Promise.allSettled
 * Some location data can fail without breaking the entire request
 */
export const resilientLocationsApi = {
  async getLocationsWithDetails(ids: string[]): Promise<{
    locations: (Location | null)[];
    failedIds: string[];
  }> {
    const promises = ids.map((id) => locationsApi.getLocation(id));
    const results = await Promise.allSettled(promises);

    const locations: (Location | null)[] = [];
    const failedIds: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        locations.push(result.value);
      } else {
        locations.push(null);
        failedIds.push(ids[index]);
      }
    });

    return { locations, failedIds };
  },
};
