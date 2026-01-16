import { http } from '../http';
import type { TemplateApi } from './templates.types';
import type { ApiResponse } from '../types';

export const templatesApi = {
  getAll: () => http.get<ApiResponse<TemplateApi[]>>('/templates'),
  getById: (id: string) => http.get<ApiResponse<TemplateApi>>(`/templates/${id}`),
};
