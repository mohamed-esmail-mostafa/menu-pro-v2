import { usePage } from '@inertiajs/react'
import React from 'react'

export default function useWebsiteSetting() {
    const { settings }:any = usePage().props
    return {
        settings
    }
}
