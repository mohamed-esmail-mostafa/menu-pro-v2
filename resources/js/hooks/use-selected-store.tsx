import { StoreContext } from '@/context/store-provider'
import React, { useContext } from 'react'

export default function useSelectedStore() {
    const context = useContext(StoreContext)
    if (!context) {
        return null
    }
    return context
}
