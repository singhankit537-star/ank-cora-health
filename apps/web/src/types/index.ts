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
  city: string;
  state: string;
  address: string;
  phone: string;
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

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'client';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
  user: User;
}
