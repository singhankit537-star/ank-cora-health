import type { ApiClient } from '../client';
import { mockFetch, mockTestimonials } from '../mock-data';
import type { CoraSdkConfig, Testimonial } from '../types';

export function createTestimonialsApi(client: ApiClient, config: CoraSdkConfig) {
  const useMocks = config.useMocks ?? true;

  return {
    async getTestimonials(): Promise<Testimonial[]> {
      if (useMocks) {
        return mockFetch(mockTestimonials, 500);
      }
      const response = await client.get<Testimonial[]>('/testimonials');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch testimonials');
      }
      return response.data;
    },
  };
}
