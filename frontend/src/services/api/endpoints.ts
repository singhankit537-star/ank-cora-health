import { coraSdk } from '@/sdk';

export const servicesApi = coraSdk.services;
export const locationsApi = coraSdk.locations;
export const testimonialsApi = coraSdk.testimonials;
export const homepageApi = coraSdk.homepage;

/** @deprecated Use `coraSdk.locations.getLocationsWithDetails` */
export const resilientLocationsApi = {
  getLocationsWithDetails: coraSdk.locations.getLocationsWithDetails,
};
