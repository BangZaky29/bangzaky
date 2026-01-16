import { useState, useEffect } from 'react';
import type { ApiResponse } from '../api/http';
import { templatesApi } from '../api/templates/templates.api';
import type { TemplateApi } from '../api/templates/templates.types';

export interface Template {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  type: string;
  style: string;
  features: string[];
  techStack: string[];
  imageUrl: string;
}

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    templatesApi.getAll()
      .then((res: ApiResponse<TemplateApi[]>) => { // <-- pakai TemplateApi
        const data = res.data || [];
        const mapped: Template[] = data.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          price: t.price,
          category: t.category,
          type: t.type,
          style: t.style,
          features: t.features || [],
          techStack: t.tech_stack || [], // mapping ke techStack
          imageUrl: t.image_url || '',   // mapping ke imageUrl
        }));
        setTemplates(mapped);
      })
      .catch(err => {
        console.error('Failed to fetch templates:', err);
        setError(err.message || 'Failed to fetch templates');
      })
      .finally(() => setLoading(false));
  }, []);

  return { templates, loading, error };
};
