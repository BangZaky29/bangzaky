// src/hooks/useBankInfo.ts
import { useState, useEffect } from 'react';
import type { BankInfo } from '../api/bank/bank.types';
import { bankApi } from '../api/bank/bank.api';

export const useBankInfo = () => {
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bankApi.getAll()
      .then(res => {
        const list = res; // http.ts sudah mengembalikan json.data
        if (Array.isArray(list) && list.length > 0) {
          const first = list[0];
          setBankInfo({
            id: first.id.toString(),
            bank: first.bank_name,
            accountNumber: first.account_number,
            accountName: first.account_name,
          });
        } else {
          setBankInfo(null);
        }
      })
      .catch(err => {
        console.error('Failed to fetch bank info:', err);
        setBankInfo(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { bankInfo, loading };
};
