import type { ApiClient } from '../client';
import { mockClinicSearchResults, mockFetch } from '../mock-data';
import type { AppointmentSearchParams, ClinicSearchResult, CoraSdkConfig } from '../types';

export function createAppointmentsApi(client: ApiClient, config: CoraSdkConfig) {
  const useMocks = config.useMocks ?? true;

  return {
    async searchClinics(params: AppointmentSearchParams): Promise<ClinicSearchResult[]> {
      if (useMocks) {
        const query = `${params.location} ${params.therapyType}`.toLowerCase();
        const filtered = mockClinicSearchResults.filter((clinic) => {
          if (!query.trim()) return true;
          const haystack = `${clinic.name} ${clinic.city} ${clinic.state} ${clinic.zipCode}`.toLowerCase();
          return haystack.includes(query.trim()) || query.split(/\s+/).some((term) => haystack.includes(term));
        });
        return mockFetch(filtered.length ? filtered : mockClinicSearchResults, 600);
      }

      const response = await client.post<ClinicSearchResult[]>('/appointments/search', params);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Clinic search failed');
      }
      return response.data;
    },
  };
}
