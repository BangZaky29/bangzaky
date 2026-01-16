// src/hooks/useTemplateDetail.ts
import { useState, useEffect } from 'react';
import type { Template as ApiTemplate } from '../api/templates/templates.types';
import type { ApiResponse } from '../api/types';
import { templatesApi } from '../api/templates/templates.api';
import type { Template as GlobalTemplate } from '../types';

export const useTemplateDetail = (id?: string) => {
  const [template, setTemplate] = useState<GlobalTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTemplate(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    templatesApi.getById(id)
      .then((res: ApiResponse<ApiTemplate>) => {
        if (!res || !res.data) throw new Error('Template not found');

        const t = res.data;

        const transformed: GlobalTemplate = {
          id: t.id.toString(),
          title: t.title,
          description: t.description,
          price: Number(t.price),     // tetap number
          category: t.category,
          type: t.type,
          style: t.style,
          features: t.features || [],
          techStack: t.tech_stack || [],
          imageUrl: t.image_url || '',
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
