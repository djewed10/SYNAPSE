/**
 * Type Definitions - API
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
