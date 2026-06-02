/**
 * Constants for the application
 */

export const APP_NAME = 'CoraHealth';
export const APP_DESCRIPTION = 'Professional physical therapy and wellness services';

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  LOCATIONS: '/locations',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const SERVICES = {
  PHYSICAL_THERAPY: 'physical-therapy',
  SPORTS_MEDICINE: 'sports-medicine',
  REHABILITATION: 'rehabilitation',
  WELLNESS: 'wellness',
} as const;
