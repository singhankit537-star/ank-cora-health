import { createAppointmentsApi } from './apis/appointments';
import { createHealthApi } from './apis/health';
import { createHomepageApi } from './apis/homepage';
import { createLocationsApi } from './apis/locations';
import { createServicesApi } from './apis/services';
import { createTestimonialsApi } from './apis/testimonials';
import { ApiClient } from './client';
import type { CoraSdkConfig } from './types';

export function createCoraSdk(config: CoraSdkConfig = {}) {
  const client = new ApiClient(config);

  const services = createServicesApi(client, config);
  const locations = createLocationsApi(client, config);
  const testimonials = createTestimonialsApi(client, config);
  const homepage = createHomepageApi(services, locations, testimonials);
  const appointments = createAppointmentsApi(client, config);
  const health = createHealthApi(client);

  return {
    client,
    health,
    services,
    locations,
    testimonials,
    homepage,
    appointments,
  };
}

export type CoraSdk = ReturnType<typeof createCoraSdk>;
