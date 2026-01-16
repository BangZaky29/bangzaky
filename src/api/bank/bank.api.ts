import { http } from '../http';
import type { BankInfo } from './bank.types';
import type { ApiResponse } from '../types';

export const bankApi = {
  getAll: () =>
    http.get<ApiResponse<BankInfo[]>>('/bank-info'),
};
