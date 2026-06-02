/**
 * Mock data for development and testing
 */

import type { Service, Location, Testimonial } from '@/types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Physical Therapy',
    description: 'Comprehensive rehabilitation and therapeutic treatment',
    icon: '🏥',
    category: 'physical-therapy',
  },
  {
    id: '2',
    name: 'Sports Medicine',
    description: 'Specialized care for athletes and active individuals',
    icon: '⚽',
    category: 'sports-medicine',
  },
  {
    id: '3',
    name: 'Wellness Programs',
    description: 'Preventative care and wellness optimization',
    icon: '💪',
    category: 'wellness',
  },
  {
    id: '4',
    name: 'Injury Rehabilitation',
    description: 'Recovery and functional restoration programs',
    icon: '🩹',
    category: 'rehabilitation',
  },
];

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Downtown Clinic',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(555) 123-4567',
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
    },
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: '2',
    name: 'Uptown Clinic',
    address: '456 Park Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10022',
    phone: '(555) 234-5678',
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 3:00 PM',
    },
    lat: 40.7614,
    lng: -73.9776,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'John Smith',
    content: 'Excellent care and professional staff. Highly recommend!',
    rating: 5,
    date: '2024-01-15',
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    content: 'Helped me recover from my injury faster than expected.',
    rating: 5,
    date: '2024-01-10',
  },
  {
    id: '3',
    author: 'Michael Brown',
    content: 'Great experience overall. Very knowledgeable therapists.',
    rating: 4,
    date: '2024-01-05',
  },
];
