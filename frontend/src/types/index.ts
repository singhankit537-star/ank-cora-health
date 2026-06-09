export type {
  ApiResponse,
  AppointmentSearchParams,
  ClinicSearchResult,
  ErrorResponse,
  HealthStatus,
  HomePageData,
  Location,
  PaymentPortal,
  PaymentPortalType,
  Service,
  Testimonial,
} from '@ank-cora/sdk';

/** @deprecated Use PaginatedResponse from SDK when added */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
