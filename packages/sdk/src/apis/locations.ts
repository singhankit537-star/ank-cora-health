import type { ApiClient } from '../client';
import { mockFetch, mockLocations } from '../mock-data';
import type { CoraSdkConfig, Location } from '../types';

export function createLocationsApi(client: ApiClient, config: CoraSdkConfig) {
  const useMocks = config.useMocks ?? true;

  return {
    async getLocations(): Promise<Location[]> {
      if (useMocks) {
        return mockFetch(mockLocations, 500);
      }
      const response = await client.get<Location[]>('/locations');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch locations');
      }
      return response.data;
    },

    async getLocation(id: string): Promise<Location | null> {
      const locations = await this.getLocations();
      return locations.find((l) => l.id === id) ?? null;
    },

    async getLocationsWithDetails(ids: string[]): Promise<{
      locations: (Location | null)[];
      failedIds: string[];
    }> {
      const results = await Promise.allSettled(ids.map((id) => this.getLocation(id)));
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
}
