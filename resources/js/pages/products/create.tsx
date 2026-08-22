import React, { useState } from 'react'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
import { Link, router } from '@inertiajs/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'
import useImport from '@/hooks/use-import'
import { Store } from '@/types/store'
import { Category } from '@/types/category'
import { Attribute } from '@/types/attributes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import InputError from '@/components/input-error'
import ImagePicker from '@/components/ui/image-picker'
import { ArrowLeft, ArrowRight, Loader2, Plus, Sparkles, Star, Tag, Utensils, Eye, Package, Sliders, Trash2, PlusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CreateProductPageProps {
    store: Store
    categories: Category[]
    attributes: Attribute[]
}

export default function CreateProductPage({ store, categories, attributes }: CreateProductPageProps) {
    const { t, isAr } = useImport()
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const [attributeRows, setAttributeRows] = useState<any[]>([
        {
            attribute_id: attributes[0]?.id ? String(attributes[0].id) : '',
            value: '',
            price: 0,
            is_default: false,
            is_required: false
        }
    ])

    const addAttributeRow = () => {
        setAttributeRows((prev) => [
            ...prev,
            {
                attribute_id: attributes[0]?.id ? String(attributes[0].id) : '',
                value: '',
                price: 0,
                is_default: false,
                is_required: false
            }
        ])
    }

    const removeAttributeRow = (index: number) => {
        setAttributeRows((prev) => prev.filter((_, idx) => idx !== index))
    }

    const updateAttributeRow = (index: number, field: string, value: any) => {
        setAttributeRows((prev) =>
            prev.map((row, idx) => {
                if (idx !== index) return row
                const updated = { ...row, [field]: value }
                if (field === 'attribute_id') {
                    const found = attributes.find((a) => String(a.id) === String(value))
                    if (found) {
                        updated.attribute_name = found.name
                    }
                }
                return updated
            })
        )
    }

    const validationSchema = Yup.object({
        store_category_id: Yup.mixed().required(t('validations.required')),
        title: Yup.string().required(t('validations.required')),
        description: Yup.string().nullable().optional(),
        is_simple: Yup.boolean().optional(),
        price: Yup.number().when('is_simple', {
            is: true,
            then: (schema) => schema.required(t('validations.required')).min(0, t('validations.must-be-positive')),
            otherwise: (schema) => schema.nullable().optional(),
        }),
        sale_price: Yup.number().min(0, t('common.must-be-positive')).nullable().optional(),
        is_featured: Yup.boolean().optional(),
    })

    const formik = useFormik({
        initialValues: {
            store_id: store?.id || '',
            store_category_id: '',
            title: '',
            description: '',
            price: '',
            sale_price: '',
            is_simple: true,
            is_featured: false,
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append('store_id', (values.store_id || store?.id || '').toString())
            formData.append('store_category_id', values.store_category_id.toString())
            formData.append('title', values.title)
            formData.append('description', values.description || '')
            formData.append('price', (values.price || 0).toString())
            if (values.sale_price) {
                formData.append('sale_price', values.sale_price.toString())
            }
            formData.append('is_simple', values.is_simple ? '1' : '0')
            formData.append('is_featured', values.is_featured ? '1' : '0')

            if (!values.is_simple && attributeRows.length > 0) {
                const validRows = attributeRows.filter((r) => r.attribute_id && String(r.value || '').trim() !== '')
                formData.append('attribute_rows', JSON.stringify(validRows))
            }

            if (imageFile) {
                formData.append('image', imageFile)
            }

            router.post('/store/product/store', formData, {
                onSuccess: () => {
                    toast.success(t('store_dashboard.products.created-success'))
                },
                onError: (errors: any) => {
                    toast.error(t('common.error'))
                    formik.setErrors(errors)
                },
            })
        },
    })

    const handleImageChange = (file: File | null) => {
        setImageFile(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setImagePreviewUrl(url)
        } else {
            setImagePreviewUrl(null)
        }
    }

    const selectedCategoryName = categories?.find((cat: any) => {
        const catId = (cat.pivot?.id || cat.id).toString()
        return catId === formik.values.store_category_id
    })?.name

    const backUrl = store?.slug ? `/store/products/page/${store.slug}` : '/store-dashboard'

    return (
        <StoreDashboardLayout>
            <div className="space-y-6 container  mx-auto pb-12">
                {/* Top Header & Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full">
                                <Link href={backUrl}>
                                    {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                                </Link>
                            </Button>
                            <span className="text-xs text-muted-foreground">
                                <Link href={backUrl} className="hover:underline">
                                    {t('store_dashboard.products.title')}
                                </Link>
                                {' / '}
                                <span className="text-foreground font-medium">{t('store_dashboard.products.create-title')}</span>
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 mt-1">
                            {t('store_dashboard.products.create-title')}
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            {t('store_dashboard.products.create-subtitle')}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={backUrl}>
                                {t('common.cancel')}
                            </Link>
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            onClick={() => formik.handleSubmit()}
                            disabled={formik.isSubmitting}
                            className="bg-primary text-primary-foreground font-medium shadow-sm gap-2"
                        >
                            {formik.isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}
                            {t('store_dashboard.products.create-product')}
                        </Button>
                    </div>
                </div>

                {/* Form Layout Grid */}
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Details (2 Columns) */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="rounded-2xl border shadow-sm">
                                <CardHeader className="border-b bg-muted/20 py-4">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <Utensils className="w-4 h-4 text-primary" />
                                        {t('store_dashboard.products.title')}
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {t('store_dashboard.products.create-subtitle')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-5">
                                    {/* Product Type Tabs */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold">
                                            {t('store_dashboard.products.product-type')}
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3 p-1.5 bg-muted/40 rounded-xl border">
                                            <button
                                                type="button"
                                                onClick={() => formik.setFieldValue('is_simple', true)}
                                                className={cn(
                                                    "flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium transition-all cursor-pointer",
                                                    formik.values.is_simple
                                                        ? "bg-background text-foreground shadow-xs border font-semibold"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                <Package className="w-4 h-4 text-primary" />
                                                {t('store_dashboard.products.is_simple')}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => formik.setFieldValue('is_simple', false)}
                                                className={cn(
                                                    "flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium transition-all cursor-pointer",
                                                    !formik.values.is_simple
                                                        ? "bg-background text-foreground shadow-xs border font-semibold text-primary"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                <Sliders className="w-4 h-4 text-primary" />
                                                {t('store_dashboard.products.with-options')}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Category Select */}
                                    <div className="space-y-2">
                                        <Label htmlFor="store_category_id" className="text-xs font-semibold">
                                            {t('store_dashboard.products.select-category')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            name="store_category_id"
                                            value={formik.values.store_category_id}
                                            onValueChange={(val) => formik.setFieldValue('store_category_id', val)}
                                        >
                                            <SelectTrigger className="w-full h-10 rounded-lg">
                                                <SelectValue placeholder={t('store_dashboard.products.select-category')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map((cat: any) => {
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

                                    {/* Product Title */}
                                    <div className="space-y-2">
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
                                            className="h-10 rounded-lg"
                                        />
                                        {formik.touched.title && formik.errors.title && (
                                            <InputError message={formik.errors.title as string} />
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
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
                                            rows={4}
                                            className="rounded-lg resize-none"
                                        />
                                    </div>

                                    {/* Price & Sale Price */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="text-xs font-semibold">
                                                {t('store_dashboard.products.price')}{' '}
                                                {formik.values.is_simple && <span className="text-destructive">*</span>}
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
                                                disabled={!formik.values.is_simple}
                                                className={cn(
                                                    "h-10 rounded-lg",
                                                    !formik.values.is_simple && "bg-muted cursor-not-allowed opacity-70"
                                                )}
                                            />
                                            {!formik.values.is_simple && (
                                                <p className="text-[11px] text-muted-foreground">
                                                    {t('store_dashboard.products.attributes-desc')}
                                                </p>
                                            )}
                                            {formik.touched.price && formik.errors.price && (
                                                <InputError message={formik.errors.price as string} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
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
                                                disabled={!formik.values.is_simple}
                                                className={cn(
                                                    "h-10 rounded-lg",
                                                    !formik.values.is_simple && "bg-muted cursor-not-allowed opacity-70"
                                                )}
                                            />
                                            {formik.touched.sale_price && formik.errors.sale_price && (
                                                <InputError message={formik.errors.sale_price as string} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Featured Product Toggle */}
                                    <div className="p-4 bg-muted/30 rounded-xl border flex items-center space-x-3 rtl:space-x-reverse">
                                        <Checkbox
                                            id="is_featured"
                                            checked={formik.values.is_featured}
                                            onCheckedChange={(checked) => formik.setFieldValue('is_featured', checked === true)}
                                        />
                                        <Label htmlFor="is_featured" className="text-xs font-medium cursor-pointer leading-normal flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            {t('store_dashboard.products.is_featured')}
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Attributes Section (Shown when is_simple is FALSE) */}
                            {!formik.values.is_simple && (
                                <Card className="rounded-2xl border border-primary/20 shadow-sm animate-in fade-in-50 duration-200">
                                    <CardHeader className="border-b bg-muted/20 py-4 flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
                                                <Sliders className="w-4 h-4" />
                                                {t('common.add-attributes')}
                                            </CardTitle>
                                            <CardDescription className="text-xs">
                                                {t('store_dashboard.products.attributes-desc')}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4">
                                        {attributeRows.map((row, idx) => (
                                            <div key={idx} className="p-3 bg-muted/30 rounded-xl border grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                                                {/* Attribute Dropdown */}
                                                <div className="sm:col-span-3 space-y-1">
                                                    {idx === 0 && (
                                                        <Label className="text-[11px] font-semibold text-muted-foreground block">
                                                            {t('common.select-attribute')} 
                                                        </Label>
                                                    )}
                                                    <Select
                                                        value={row.attribute_id ? String(row.attribute_id) : undefined}
                                                        onValueChange={(val) => updateAttributeRow(idx, 'attribute_id', val)}
                                                    >
                                                        <SelectTrigger className="h-9 text-xs rounded-lg bg-background">
                                                            <SelectValue placeholder={t('common.select-attribute')}>
                                                                {attributes.find((a) => String(a.id) === String(row.attribute_id))?.name || row.attribute_name}
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {attributes.map((attr) => (
                                                                <SelectItem key={attr.id} value={String(attr.id)}>
                                                                    {attr.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Value Text Input */}
                                                <div className="sm:col-span-3 space-y-1">
                                                    {idx === 0 && (
                                                        <Label className="text-[11px] font-semibold text-muted-foreground block">
                                                            {t('common.value')}
                                                        </Label>
                                                    )}
                                                    <Input
                                                        className="h-9 text-xs rounded-lg bg-background"
                                                        placeholder={t('common.value')}
                                                        value={row.value}
                                                        onChange={(e) => updateAttributeRow(idx, 'value', e.target.value)}
                                                    />
                                                </div>

                                                {/* Extra Price Input */}
                                                <div className="sm:col-span-2 space-y-1">
                                                    {idx === 0 && (
                                                        <Label className="text-[11px] font-semibold text-muted-foreground block">
                                                            {t('common.price')}
                                                        </Label>
                                                    )}
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        className="h-9 text-xs rounded-lg bg-background"
                                                        placeholder="0.00"
                                                        value={row.price}
                                                        onChange={(e) => updateAttributeRow(idx, 'price', Number(e.target.value))}
                                                    />
                                                </div>

                                                {/* Default & Required Checkboxes */}
                                                <div className="sm:col-span-3 flex items-center justify-around gap-2 pb-1">
                                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                        <Checkbox
                                                            id={`default-${idx}`}
                                                            checked={Boolean(row.is_default)}
                                                            onCheckedChange={(chk) => updateAttributeRow(idx, 'is_default', chk === true)}
                                                        />
                                                        <Label htmlFor={`default-${idx}`} className="text-[11px] cursor-pointer">
                                                            {t('common.is_default')}
                                                        </Label>
                                                    </div>

                                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                        <Checkbox
                                                            id={`req-${idx}`}
                                                            checked={Boolean(row.is_required)}
                                                            onCheckedChange={(chk) => updateAttributeRow(idx, 'is_required', chk === true)}
                                                        />
                                                        <Label htmlFor={`req-${idx}`} className="text-[11px] cursor-pointer">
                                                            {t('common.is_required')}
                                                        </Label>
                                                    </div>
                                                </div>

                                                {/* Remove Row Button */}
                                                <div className="sm:col-span-1 flex justify-end pb-0.5">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg"
                                                        onClick={() => removeAttributeRow(idx)}
                                                        disabled={attributeRows.length === 1}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="w-full flex items-center justify-center gap-1.5 text-xs rounded-xl h-9"
                                            onClick={addAttributeRow}
                                        >
                                            <PlusCircle className="w-4 h-4 text-primary" />
                                            {t('common.add-attributes')}
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Image Upload & Card Preview (1 Column) */}
                        <div className="space-y-6">
                            {/* Image Uploader */}
                            <Card className="rounded-2xl border shadow-sm">
                                <CardHeader className="border-b bg-muted/20 py-4">
                                    <CardTitle className="text-base font-semibold">
                                        {t('store_dashboard.products.product-image')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ImagePicker
                                        id="product-image"
                                        label={t('store_dashboard.products.product-image')}
                                        onChange={handleImageChange}
                                    />
                                </CardContent>
                            </Card>

                            {/* Live Card Preview */}
                            <Card className="rounded-2xl border shadow-sm overflow-hidden bg-card">
                                <CardHeader className="border-b bg-muted/20 py-3">
                                    <CardTitle className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
                                        <Eye className="w-3.5 h-3.5 text-primary" />
                                        {t('store_dashboard.products.preview')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="relative rounded-xl border bg-card p-3 shadow-xs">
                                        <div className="relative aspect-video rounded-lg bg-muted mb-3 overflow-hidden border">
                                            {imagePreviewUrl ? (
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                    <Utensils className="w-8 h-8 opacity-20 text-muted-foreground" />
                                                </div>
                                            )}

                                            {formik.values.is_featured && (
                                                <Badge className="absolute top-2 left-2 bg-amber-500 text-white gap-1 text-[10px]">
                                                    <Star className="w-3 h-3 fill-current" />
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h4 className="font-semibold text-sm truncate">
                                                {formik.values.title || t('store_dashboard.products.product-title')}
                                            </h4>
                                            {selectedCategoryName && (
                                                <Badge variant="secondary" className="text-[10px] shrink-0 font-normal">
                                                    <Tag className="w-2.5 h-2.5 mr-1 inline opacity-60" />
                                                    {selectedCategoryName}
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                            {formik.values.description || t('store_dashboard.products.description')}
                                        </p>

                                        <div className="flex items-baseline gap-2 mt-2">
                                            {formik.values.sale_price && Number(formik.values.sale_price) < Number(formik.values.price) ? (
                                                <>
                                                    <span className="text-sm font-bold text-primary">
                                                        {formik.values.sale_price} {store?.country?.currency_ar}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground line-through">
                                                        {formik.values.price}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-sm font-bold text-primary">
                                                    {formik.values.price || '0.00'} {store?.country?.currency_ar}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </StoreDashboardLayout>
    )
}
