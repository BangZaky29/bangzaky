// src/hooks/useTemplates.ts
import { useState, useEffect } from 'react';
import type { Template as ApiTemplate } from '../api/templates/templates.types';
import type { ApiResponse } from '../api/types';
import { templatesApi } from '../api/templates/templates.api';

// Frontend-friendly Template type
export interface Template {
  id: string;            // Ubah ke string untuk konsistensi global
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
    setLoading(true);
    setError(null);

    templatesApi.getAll()
      .then((res: ApiResponse<ApiTemplate[]>) => {
        if (!res || !res.data || res.data.length === 0) {
          throw new Error('No templates found');
        }

        const mapped: Template[] = res.data.map(t => ({
          id: t.id.toString(),          // convert ke string
          title: t.title,
          description: t.description,
          price: t.price,
          category: t.category,
          type: t.type,
          style: t.style,
          features: t.features || [],
          techStack: t.tech_stack || [],
          imageUrl: t.image_url || '',
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
