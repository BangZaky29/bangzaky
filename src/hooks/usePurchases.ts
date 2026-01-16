// C:\codingVibes\myPortfolio\bangzaky\src\hooks\usePurchases.ts

import { useState, useEffect, useCallback } from 'react';
import type { Purchase } from '../api/purchases/purchases.types';
import { purchasesApi } from '../api/purchases/purchases.api';

export const usePurchases = (userId: string | number) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert userId to number once
  const numericUserId = Number(userId);

  const fetchPurchases = useCallback(() => {
    if (!numericUserId) return; // safety check
    setLoading(true);
    purchasesApi.getByUserId(numericUserId)
      .then(setPurchases)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [numericUserId]);

  useEffect(() => {
    if (numericUserId) fetchPurchases();
  }, [numericUserId, fetchPurchases]);

    const recordPurchase = async (templateId: string | number) => {
    const numericTemplateId = Number(templateId);
    const numericUserId = Number(userId);

    if (!numericUserId || !numericTemplateId) {
        console.error('Invalid userId or templateId');
        return false;
    }

    try {
        await purchasesApi.create({
        userId: numericUserId,
        templateId: numericTemplateId
        });
        fetchPurchases();
        return true;
    } catch (e) {
        console.error('Purchase error:', e);
        return false;
    }
    };


  return { purchases, loading, recordPurchase };
};
