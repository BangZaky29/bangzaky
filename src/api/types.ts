export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number; // optional, untuk list API
}
