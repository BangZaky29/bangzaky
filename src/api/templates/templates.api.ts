import { http } from '../http';
import type { Template } from './templates.types';
import type { ApiResponse } from '../types';

export const templatesApi = {
  getAll: () =>
    http.get<ApiResponse<Template[]>>('/templates'),

  getById: (id: string) =>
    http.get<ApiResponse<Template>>(`/templates/${id}`),
};
