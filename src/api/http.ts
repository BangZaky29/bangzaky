// C:\codingVibes\myPortfolio\bangzaky\src\api\http.ts

import type { ApiResponse } from './types';

export type { ApiResponse }; // ✅ tambahkan ini

const BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new ApiError(res.status, 'API returned success=false');
  }

  return json.data;
}

export const http = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T, B extends Record<string, unknown>>(
    endpoint: string,
    body: B
  ) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T, B extends Record<string, unknown>>(
    endpoint: string,
    body: B
  ) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: 'DELETE',
    }),
};
