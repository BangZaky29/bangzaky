import { useState, useEffect } from 'react';
import type { Template as ApiTemplate } from '../api/templates/templates.types';
import { templatesApi } from '../api/templates/templates.api';

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
    if (!id) {
      setTemplate(null);
      setLoading(false);
      setError(null);
      return;
    }

    templatesApi.getById(id)
      .then((res: ApiTemplate) => {
        if (!res) throw new Error('Template not found');

        const transformed: Template = {
          id: res.id,
          title: res.title,
          description: res.description,
          price: res.price,
          category: res.category,
          type: res.type,
          style: res.style,
          features: res.features || [],
          techStack: res.tech_stack || [],
          imageUrl: res.image_url || '',
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
