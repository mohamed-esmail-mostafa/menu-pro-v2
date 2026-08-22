import StoreDashboardLayout from '@/layouts/store-dashboard-layout'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { router } from '@inertiajs/react'
import InputError from '@/components/input-error'
import { Loader2, Plus, Edit, Trash2, Utensils, Tag, Sparkles, Star } from 'lucide-react'
import ImagePicker from '@/components/ui/image-picker'
import { Checkbox } from '@/components/ui/checkbox'
import { Store } from '@/types/store'
import { toast } from 'sonner'
import ProductsTable from './components/products-table'
import { Attribute } from '@/types/attributes'
import PageHeader from '@/components/shared/page-header'
import useCreateUpdateProduct from './hooks/use-create-update-product'
import CreateUpdateDialog from '../tables/components/create-update-dialog'
import useImport from '@/hooks/use-import'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Product } from '@/types/product'

export default function ProductsPage({ store, attributes, products }: { store: Store, attributes: Attribute[], products: any }) {


    const { t, isAr } = useImport()
    const [openDialog, setOpenDialog] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const validationSchema = Yup.object({
        store_category_id: Yup.mixed().required(t('validations.required')),
        title: Yup.string().required(t('validations.required')),
        description: Yup.string().nullable().optional(),
        price: Yup.number().min(0, t('validations.must-be-positive')).required(t('validations.required')),
        sale_price: Yup.number().min(0, t('common.must-be-positive')).nullable().optional(),
        is_simple: Yup.boolean().optional(),
        is_featured: Yup.boolean().optional(),
    })

    const formik = useFormik({
        initialValues: {
            store_id: store?.id,
            store_category_id: editingProduct?.store_category_id ? editingProduct.store_category_id.toString() : '',
            title: editingProduct?.title || '',
            description: editingProduct?.description || '',
            price: editingProduct?.price ? editingProduct.price.toString() : '',
            sale_price: editingProduct?.sale_price ? editingProduct.sale_price.toString() : '',
            is_simple: editingProduct?.is_simple ?? true,
            is_featured: editingProduct?.is_featured ?? false,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData()
            formData.append('store_id', values.store_id.toString())
            formData.append('store_category_id', values.store_category_id.toString())
            formData.append('title', values.title)
            formData.append('description', values.description || '')
            formData.append('price', values.price.toString())
            if (values.sale_price) {
                formData.append('sale_price', values.sale_price.toString())
            }
            formData.append('is_simple', values.is_simple ? '1' : '0')
            formData.append('is_featured', values.is_featured ? '1' : '0')

            if (imageFile) {
                formData.append('image', imageFile)
            }

            if (editingProduct?.id) {
                formData.append('_method', 'PUT')
                router.post(`/store/product/update/${editingProduct.id}`, formData, {
                    onSuccess: () => {
                        toast.success(t('common.success'))
                        handleCloseDialog()
                    },
                    onError: (errors) => {
                        toast.error(t('common.error'))
                        formik.setErrors(errors)
                    },
                })
            } else {
                router.post('/store/product/store', formData, {
                    onSuccess: () => {
                        toast.success(t('common.success'))
                        handleCloseDialog()
                    },
                    onError: (errors: any) => {
                        toast.error(t('common.error'))
                        formik.setErrors(errors)
                    },
                })
            }
        },
    })

    const handleOpenCreate = () => {
        setEditingProduct(null)
        setImageFile(null)
        formik.resetForm()
        setOpenDialog(true)
    }

    const handleOpenEdit = (productItem: Product) => {
        setEditingProduct(productItem)
        setImageFile(null)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setEditingProduct(null)
        setImageFile(null)
        formik.resetForm()
    }






    return (
        <StoreDashboardLayout>
            <div className="space-y-6">
                {/* Top Header */}

                <PageHeader
                    icon={<Utensils className="w-6 h-6 text-primary" />}
                    title={t('store_dashboard.products.title')}
                    subtitle={t('store_dashboard.products.subtitle')}
                    count={store?.products?.length || 0}
                >
                    <Button onClick={() => setOpenDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        {t('store_dashboard.products.add-new')}
                    </Button>
                </PageHeader>

                {/* Create/Edit Product Dialog */}


                <Dialog open={openDialog} onOpenChange={(open) => !open && handleCloseDialog()}>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                {editingProduct
                                    ? (t('store_dashboard.products.edit'))
                                    : (t('store_dashboard.products.add-new'))}
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">

                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-2">
                           
                            <div className="space-y-1.5">
                                <Label htmlFor="store_category_id" className="text-xs font-semibold">
                                    {t('store_dashboard.products.select-category')} <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    name="store_category_id"
                                    value={formik.values.store_category_id}
                                    onValueChange={(val) => formik.setFieldValue('store_category_id', val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('store_dashboard.products.select-category')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {store?.categories?.map((cat: any) => {
                                            const catId = (cat.pivot?.id || cat.id).toString()
                                            return (
                                                <SelectItem key={cat.id} value={catId}>
                                                    {cat.name}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                {formik.touched.store_category_id && formik.errors.store_category_id && (
                                    <InputError message={formik.errors.store_category_id as string} />
                                )}
                            </div>

                       
                            <div className="space-y-1.5">
                                <Label htmlFor="title" className="text-xs font-semibold">
                                    {t('store_dashboard.products.product-title')} <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={t('store_dashboard.products.product-title')}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <InputError message={formik.errors.title as string} />
                                )}
                            </div>

                        
                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-xs font-semibold">
                                    {t('store_dashboard.products.description')}
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={t('common.description')}
                                    rows={3}
                                />
                            </div>

                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="price" className="text-xs font-semibold">
                                        {t('store_dashboard.products.price')} <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="0.00"
                                    />
                                    {formik.touched.price && formik.errors.price && (
                                        <InputError message={formik.errors.price as string} />
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="sale_price" className="text-xs font-semibold">
                                        {t('store_dashboard.products.sale-price')}
                                    </Label>
                                    <Input
                                        id="sale_price"
                                        name="sale_price"
                                        type="number"
                                        step="0.01"
                                        value={formik.values.sale_price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="0.00"
                                    />
                                    {formik.touched.sale_price && formik.errors.sale_price && (
                                        <InputError message={formik.errors.sale_price as string} />
                                    )}
                                </div>
                            </div>

                          
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-muted/40 rounded-xl border">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Checkbox
                                        id="is_simple"
                                        checked={formik.values.is_simple}
                                        onCheckedChange={(checked) => formik.setFieldValue('is_simple', checked === true)}
                                    />
                                    <Label htmlFor="is_simple" className="text-xs font-medium cursor-pointer">
                                        {t('store_dashboard.products.is_simple')}
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Checkbox
                                        id="is_featured"
                                        checked={formik.values.is_featured}
                                        onCheckedChange={(checked) => formik.setFieldValue('is_featured', checked === true)}
                                    />
                                    <Label htmlFor="is_featured" className="text-xs font-medium cursor-pointer">
                                        {t('store_dashboard.products.is_featured')}
                                    </Label>
                                </div>
                            </div>

                          
                            <div className="space-y-1.5">
                                <ImagePicker
                                    id="product-image"
                                    label={t('store_dashboard.products.product-image')}
                                    onChange={(file) => setImageFile(file)}
                                    initialPreview={editingProduct?.image || undefined}
                                />
                            </div>

                           
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseDialog}
                                    disabled={formik.isSubmitting}
                                >
                                    {t('common.cancel')}
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="bg-primary text-primary-foreground font-medium"
                                >
                                    {formik.isSubmitting && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    {editingProduct
                                        ? (t('common.update'))
                                        : (t('common.create'))}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Products Grid */}
                <ProductsTable
                    store={store}
                    products={products}
                    handleOpenEdit={handleOpenEdit}
                    deletingId={deletingId}
                    attributes={attributes}
                />
            </div>
        </StoreDashboardLayout>
    )
}
