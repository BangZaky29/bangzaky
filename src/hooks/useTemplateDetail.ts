import { useState, useEffect } from 'react';
import { templatesApi } from '../api/templates/templates.api';

export interface Template {
  id: number;
  title: string;
  description: string;
  price: string; // <- backend sudah string
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
        .then(res => {
            if (!res.data) throw new Error('Template not found');

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
