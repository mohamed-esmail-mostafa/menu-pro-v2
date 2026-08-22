import PageHeader from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useImport from '@/hooks/use-import'
import AdminLayout from '@/layouts/admin-layout'
import { Category } from '@/types/category'
import { useFormik } from 'formik'
import { Edit, Image, Trash2 } from 'lucide-react'
import { useState } from 'react'


export default function admin_categories({ categories }: { categories: Category[] }) {
    const [openDialog, setOpenDialog] = useState(false)
    const { t } = useImport();

    const formik = useFormik({
        initialValues:{
            
        },
        onSubmit:()=>{

        }
    })

    return (
        <AdminLayout>
            <PageHeader>
                <Button onClick={() => setOpenDialog(true)}>
                    {t('categories.add-category')}
                </Button>
            </PageHeader>
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

            <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
                <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border border-border sm:max-w-lg">
                    {/* Header Image */}


                    {/* Details Section */}
                    <div className="p-5 sm:p-6 space-y-4">
                        <DialogHeader className="text-left rtl:text-right space-y-1">
                            <div className="flex items-center justify-between gap-2">
                                <DialogTitle className="text-xl font-bold text-foreground">

                                </DialogTitle>

                            </div>


                        </DialogHeader>






                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    )
}
