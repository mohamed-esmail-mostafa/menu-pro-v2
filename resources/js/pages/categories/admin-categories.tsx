import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin-layout'
import { Category } from '@/types/category'
import { Edit, Image, Trash2 } from 'lucide-react'


export default function admin_categories({ categories }: { categories: Category[] }) {
    return (
        <AdminLayout>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categories.map((category: Category) => (
                    <div className='border'>

                        <div className='flex items-center'>
                            {category.image ? <img className='w-18 h-full' src={category.image || undefined} alt={category.name} /> : <Image className='w-18 h-full' />}

                            <div>
                                <h2 className='text-md'>{category.name}</h2>
                                <div className='flex gap-2'>
                                    <Button size="sm"> <Edit /> </Button>
                                    <Button variant="destructive" size="sm"> <Trash2 /> </Button>
                                </div>
                            </div>
                        </div>

                    </div>))}
            </div>
        </AdminLayout>
    )
}
