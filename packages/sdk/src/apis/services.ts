import type { ApiClient } from '../client';
import { mockFetch, mockServices } from '../mock-data';
import type { CoraSdkConfig, Service } from '../types';

export function createServicesApi(client: ApiClient, config: CoraSdkConfig) {
  const useMocks = config.useMocks ?? true;

  return {
    async getServices(): Promise<Service[]> {
      if (useMocks) {
        return mockFetch(mockServices, 500);
      }
      const response = await client.get<Service[]>('/services');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch services');
      }
      return response.data;
    },

    async getService(id: string): Promise<Service | null> {
      const services = await this.getServices();
      return services.find((s) => s.id === id) ?? null;
    },
  };
}
