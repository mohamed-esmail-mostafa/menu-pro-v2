import { Store } from '@/types/store'
import React from 'react'

export default function index({store}:{store:Store}) {
  return (
    <div>
        {store.slug}
        {store.name}
    </div>
  )
}
