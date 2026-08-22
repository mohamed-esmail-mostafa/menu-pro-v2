import useImport from '@/hooks/use-import'
import { Product } from '@/types/product'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { Store } from '@/types/store'

export default function useCreateUpdateProduct({ store }: { store: Store }) {
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
                        toast.success(t('products.updated-success') || (isAr ? 'تم تحديث المنتج بنجاح' : 'Product updated successfully'))
                        handleCloseDialog()
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                    },
                })
            } else {
                router.post('/store/product/store', formData, {
                    onSuccess: () => {
                        toast.success(t('products.created-success') || (isAr ? 'تم إنشاء المنتج بنجاح' : 'Product created successfully'))
                        handleCloseDialog()
                    },
                    onError: (errors: any) => {
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
    return {
        t,
        openDialog,
        handleCloseDialog,
        handleOpenEdit,
        deletingId,
        editingProduct,
        formik,
        setImageFile,
        handleOpenCreate,
       
    }
}
