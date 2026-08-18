import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin-layout'
import { Country } from '@/types/country'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

export default function index({ countries }: { countries: Country[] }) {
    return (
        <AdminLayout>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {countries.map((country: Country) => (
                    <div key={country.id} className='border border-gray-600 p-2 rounded-md'>
                        <h3>{country.name_en}</h3>
                        <h3>{country.name_ar}</h3>
                        <h3>{country.currency_en} - {country.currency_ar}</h3>
                        <h3>{country.code}</h3>
                        <div className='flex gap-2'>
                            <Button size="sm"> <Edit /> </Button>
                            <Button variant="destructive" size="sm"> <Trash2 /> </Button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    )
}
