/**
 * Core application types
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'physical-therapy' | 'rehabilitation' | 'sports-medicine' | 'wellness';
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  lat: number;
  lng: number;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ErrorResponse {
  message: string;
  code: string;
  timestamp: string;
}
