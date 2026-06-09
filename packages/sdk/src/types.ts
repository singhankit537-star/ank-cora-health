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

export interface ErrorResponse {
  message: string;
  code: string;
  timestamp: string;
}

export interface HealthStatus {
  ok: boolean;
}

export interface AppointmentSearchParams {
  therapyType: string;
  location: string;
  insurance: string;
  seenDoctor: boolean;
}

export interface ClinicSearchResult {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  distanceMiles?: number;
  therapyTypes: string[];
}

export interface HomePageData {
  services: Service[];
  locations: Location[];
  testimonials: Testimonial[];
}

export interface CoraSdkConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  /** Use in-memory mock data instead of HTTP (default: true until API routes exist) */
  useMocks?: boolean;
}
