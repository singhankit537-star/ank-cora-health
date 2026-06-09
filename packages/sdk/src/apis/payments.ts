import type { ApiClient } from '../client';
import { mockFetch } from '../mock-data';
import type { CoraSdkConfig, PaymentPortal, PaymentPortalType } from '../types';

const MOCK_PORTALS: PaymentPortal[] = [
  {
    id: 'patient',
    type: 'patient',
    label: 'Patient Payment Portal',
    description: 'If you are a patient making a payment, please click below.',
    url: 'https://pay.coraphysicaltherapy.com/patient',
  },
  {
    id: 'attorney',
    type: 'attorney',
    label: 'Attorney Payment Portal',
    description: 'If you are an attorney making a payment, please click below.',
    url: 'https://pay.coraphysicaltherapy.com/attorney',
  },
];

export function createPaymentsApi(client: ApiClient, config: CoraSdkConfig) {
  const useMocks = config.useMocks ?? true;

  return {
    async getPortals(): Promise<PaymentPortal[]> {
      if (useMocks) {
        return mockFetch(MOCK_PORTALS, 300);
      }
      const response = await client.get<PaymentPortal[]>('/payments/portals');
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch payment portals');
      }
      return response.data;
    },

    async getPortalUrl(type: PaymentPortalType): Promise<string> {
      const portals = await this.getPortals();
      const portal = portals.find((p) => p.type === type);
      if (!portal) {
        throw new Error(`Payment portal not found: ${type}`);
      }
      return portal.url;
    },
  };
}
