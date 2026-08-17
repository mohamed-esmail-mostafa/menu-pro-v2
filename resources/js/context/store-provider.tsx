
import { Store } from '@/types/store';
import React, { createContext, useEffect, useState } from 'react'

interface StoreContextType {
    selectedStore: Store | null;
    selectStore: (store: Store) => void;
    clearStore: () => void;
    getCurrentStore: ()=>Store | null
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);
const STORAGE_KEY = "selected_store";
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);


    // load the selected store
    useEffect(() => {
        const savedStore = localStorage.getItem(STORAGE_KEY);
        if (savedStore) {
            setSelectedStore(JSON.parse(savedStore))
        }
    }, [])


    // save Selected Store
    const selectStore =  (store: Store) => {
         localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
         setSelectedStore(store);
    }

    // remove Selected Store
    const clearStore = () => {
        setSelectedStore(null)
        localStorage.removeItem(STORAGE_KEY)
    }

   
    const getCurrentStore = ()=>{
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null")
    }

    return (
        <StoreContext.Provider value={{ selectedStore, selectStore, clearStore ,  getCurrentStore }}>{children}</StoreContext.Provider>
    )
}
