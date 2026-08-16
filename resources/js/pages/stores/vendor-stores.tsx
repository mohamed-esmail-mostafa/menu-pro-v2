import { Store } from '@/types/store'
import React from 'react'

export default function VendorStores({ stores }: { stores: Store[] }) {
    return (
        <div>
            {stores.map((store: Store) => (
                <div>
                    <img src={store.image || undefined} alt={store.name} />
                </div>
            ))}
        </div>
    )
}
