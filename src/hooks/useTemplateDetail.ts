import { useState, useEffect } from 'react';
import type { ApiResponse } from '../api/http';
import { templatesApi } from '../api/templates/templates.api';
import type { TemplateApi } from '../api/templates/templates.types'; // ✅ tipe API

// Frontend type
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

export const useTemplateDetail = (id?: string) => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Jika id tidak ada, set state setelah microtask untuk menghindari warning ESLint
    if (!id) {
      setTimeout(() => {
        setTemplate(null);
        setLoading(false);
        setError(null);
      }, 0);
      return;
    }

    templatesApi.getById(id)
      .then((res: ApiResponse<TemplateApi>) => { // ✅ gunakan TemplateApi
        if (!res.data) {
          setTemplate(null);
          return;
        }

        const t = res.data;
        const transformed: Template = {
          id: t.id,
          title: t.title,
          description: t.description,
          price: t.price,
          category: t.category,
          type: t.type,
          style: t.style,
          features: t.features || [],
          techStack: t.tech_stack || [], // mapping ke frontend
          imageUrl: t.image_url || '',   // mapping ke frontend
        };

        setTemplate(transformed);
      })
      .catch(err => {
        console.error('Failed to fetch template detail:', err);
        setError(err.message || 'Failed to load template');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { template, loading, error };
};
