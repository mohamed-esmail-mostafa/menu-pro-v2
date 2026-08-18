import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ImagePicker from '@/components/ui/image-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useImport from '@/hooks/use-import'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
import { Country } from '@/types/country'
import { Store } from '@/types/store'
import { router } from '@inertiajs/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, Languages, Loader2 } from 'lucide-react'

export default function update({ store, countries }: { store: Store, countries: Country[] }) {
    const { t ,i18n} = useImport()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formik = useFormik({
        initialValues: {
            country_id: store.country_id ? String(store.country_id) : '',
            name: store.name || '',
            slug: store.slug || '',
            email: store.email || '',
            phone: store.phone || '',
            address: store.address || '',
            description: store.description || '',
            image: null as File | null,
            banner: null as File | null,
        },
        // validationSchema,
        onSubmit: async (values) => {

            setIsSubmitting(true)
            const slug = values.name
                .trim()
                .toLowerCase()
                .replace(/[^\p{L}\p{N}]+/gu, '-')
                .replace(/^-+|-+$/g, '')

            const formData = new FormData()
            formData.append('country_id', values.country_id)
            formData.append('name', values.name)
            formData.append('slug', slug)
            if (values.email) formData.append('store_email', values.email)
            if (values.phone) formData.append('store_phone', values.phone)
            if (values.address) formData.append('store_address', values.address)
            if (values.description) formData.append('store_description', values.description)
            if (values.image) formData.append('image', values.image)
            if (values.banner) formData.append('banner', values.banner)

            await router.post(`/store/update/${store.id}`, formData, {
                onSuccess: () => {
                    setIsSubmitting(false)
                    toast.success(t('common.success'))
                },
                onError: (errors:any) => {
                    toast.success(t('common.error_happened'))
                    setIsSubmitting(false)
                    Object.keys(errors).forEach((key) => {
                        formik.setFieldError(key, errors[key])
                    })

                },
            })
        },
    })
    return (
        <StoreDashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <div className=" mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('stores.edit-details-store')}
                        </h1>
                        {/* <p className="text-gray-500 dark:text-gray-400">
                            {t('stores.update-description')}
                        </p> */}
                    </div>

                    <Card className="shadow-lg border-0 dark:bg-gray-800">
                        <CardContent className="pt-6">
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        
                                        <Label htmlFor="store_name">{t('auth.store-name')}</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formik.values.name}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                const value = e.target.value;
                                                const slug = value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(/[^a-z0-9]+/g, '-')
                                                    .replace(/^-+|-+$/g, '');
                                                formik.setFieldValue('slug', slug);
                                            }}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.name && formik.errors.name && (
                                            <InputError message={formik.errors.name} />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ImagePicker
                                            id="image"
                                            label={t('auth.store-logo')}
                                            accept="image/*"
                                            onChange={(file) => formik.setFieldValue('image', file)}
                                            disabled={isSubmitting}
                                            error={formik.touched.image && formik.errors.image ? formik.errors.image : undefined}
                                            previewClassName="h-40 object-contain"
                                            initialPreview={store.image}
                                        />

                                        <ImagePicker
                                            id="banner"
                                            label={t('auth.store-banner')}
                                            accept="image/*"
                                            onChange={(file) => formik.setFieldValue('banner', file)}
                                            disabled={isSubmitting}
                                            error={formik.touched.banner && formik.errors.banner ? formik.errors.banner: undefined}
                                            previewClassName="h-40 object-cover"
                                            initialPreview={store.banner}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">{t('auth.store-email')}</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <InputError message={formik.errors.email} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">{t('auth.store-phone')}</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.phone && formik.errors.phone && (
                                            <InputError message={formik.errors.phone} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address">{t('auth.store-address')}</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.address && formik.errors.address && (
                                            <InputError message={formik.errors.address} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">{t('auth.store-description')}</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            rows={4}
                                        />
                                        
                                        {formik.touched.description && formik.errors.description && (
                                            <InputError message={formik.errors.description} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>{t('auth.choose-country')}</Label>
                                        <Select
                                            value={formik.values.country_id}
                                            onValueChange={(value) => formik.setFieldValue('country_id', value)}
                                        >
                                            <SelectTrigger className="w-full h-11">
                                                <Languages className="w-4 h-4 mr-2" />
                                                <SelectValue placeholder={t('common.choose-country')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries && countries.map((country: any) => (
                                                    <SelectItem key={country.id} value={String(country.id)}>
                                                        {i18n.language === 'ar' ? country.name_ar : country.name_en}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {formik.touched.country_id && formik.errors.country_id && (
                                            <InputError message={formik.errors.country_id} />
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        disabled={isSubmitting}
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="min-w-35"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                {t('common.saving')}...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                {t('common.save')}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </StoreDashboardLayout>
    )
}
