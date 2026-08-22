import React, { useMemo } from 'react'
import useImport from './use-import';
import { Store } from '@/types/store';

export default function useCurrencyStore({store}:{store:Store}) {
   const {isAr}=useImport()
   
    const currency = useMemo(() => {
            if (!store.country) return isAr ? 'ج.م' : 'E£';
            return isAr
                ? store.country.currency_ar || store.country.currency_en || 'ج.م'
                : store.country.currency_en || store.country.currency_ar || 'E£';
        }, [store.country, isAr]);
  return {
    currency
  }
}
