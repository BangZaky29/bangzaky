import { useState, useEffect } from 'react';
import type { Template } from '../api/templates/templates.types';
import { templatesApi } from '../api/templates/templates.api';

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    templatesApi.getAll()
      .then((res) => {
        console.log('API Response (already json.data):', res);

        // res sekarang adalah T, yaitu Template[]
        // Mapping ke camelCase supaya TS konsisten
        const mappedData = (res as any[]).map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          price: t.price,
          category: t.category,
          type: t.type,
          style: t.style,
          imageUrl: t.image_url,   // snake_case → camelCase
          techStack: t.tech_stack, // snake_case → camelCase
          features: t.features,
        }));

        setTemplates(mappedData);
      })
      .catch(err => {
        console.error('Failed to fetch templates:', err);
        setError(err.message || 'Failed to fetch templates');
      })
      .finally(() => setLoading(false));
  }, []);

  return { templates, loading, error };
};
