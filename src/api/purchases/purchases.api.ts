// C:\codingVibes\myPortfolio\bangzaky\src\api\purchases\purchases.api.ts
import { http } from '../http';
import type { Purchase } from './purchases.types';

export const purchasesApi = {
  // Ambil semua purchase berdasarkan userId
  getByUserId: (userId: number) =>
    http.get<Purchase[]>(`/purchases/user/${userId}`), // return Purchase[]

  // Create purchase baru
  create: (data: { userId: number; templateId: number }) =>
    http.post<Purchase, { user_id: number; template_id: number }>(
      '/purchases',
      {
        user_id: data.userId,       // map ke field backend
        template_id: data.templateId // map ke field backend
      }
    ),
};
