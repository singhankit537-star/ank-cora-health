import type { ApiClient } from '../client';
import type { HealthStatus } from '../types';

export function createHealthApi(client: ApiClient) {
  return {
    async check(): Promise<HealthStatus> {
      const response = await client.get<HealthStatus>('/health');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Health check failed');
      }
      return response.data;
    },
  };
}
