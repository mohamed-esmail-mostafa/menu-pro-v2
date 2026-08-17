import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AdminLayout from '@/layouts/admin-layout'
import useImport from '@/hooks/use-import'
import { WebsiteSetting } from '@/types/website-setting'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ImagePicker from '@/components/ui/image-picker'
import InputError from '@/components/input-error'
import { toast } from 'sonner'
import {
    Globe,
    Palette,
    Phone,
    Share2,
    Save,
    Loader2,
    Settings,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Sparkles,
    CheckCircle2
} from 'lucide-react'

interface WebsiteSettingPageProps {
    setting: WebsiteSetting | null
}

export default function WebsiteSettingIndex({ setting }: WebsiteSettingPageProps) {
    const { t, isAr } = useImport()
    const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'contact' | 'social'>('general')

    const validationSchema = Yup.object({
        name_en: Yup.string().nullable(),
        name_ar: Yup.string().nullable(),
        description_en: Yup.string().nullable(),
        description_ar: Yup.string().nullable(),
        keywords_en: Yup.string().nullable(),
        keywords_ar: Yup.string().nullable(),
        email: Yup.string().email(t('auth.invalid-email')).nullable(),
        phone: Yup.string().nullable(),
        whatsup: Yup.string().nullable(),
        address: Yup.string().nullable(),
        facebook: Yup.string().url().nullable(),
        instagram: Yup.string().url().nullable(),
        tiktok: Yup.string().url().nullable(),
        light_logo: Yup.mixed().nullable(),
        dark_logo: Yup.mixed().nullable(),
        favicon: Yup.mixed().nullable(),
    })

    const formik = useFormik({
        initialValues: {
            name_en: setting?.name_en || '',
            name_ar: setting?.name_ar || '',
            description_en: setting?.description_en || '',
            description_ar: setting?.description_ar || '',
            keywords_en: setting?.keywords_en || '',
            keywords_ar: setting?.keywords_ar || '',
            email: setting?.email || '',
            phone: setting?.phone || '',
            whatsup: setting?.whatsup || '',
            address: setting?.address || '',
            facebook: setting?.facebook || '',
            instagram: setting?.instagram || '',
            tiktok: setting?.tiktok || '',
            light_logo: null as File | null,
            dark_logo: null as File | null,
            favicon: null as File | null,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData()

            if (values.name_en) formData.append('name_en', values.name_en)
            if (values.name_ar) formData.append('name_ar', values.name_ar)
            if (values.description_en) formData.append('description_en', values.description_en)
            if (values.description_ar) formData.append('description_ar', values.description_ar)
            if (values.keywords_en) formData.append('keywords_en', values.keywords_en)
            if (values.keywords_ar) formData.append('keywords_ar', values.keywords_ar)
            if (values.email) formData.append('email', values.email)
            if (values.phone) formData.append('phone', values.phone)
            if (values.whatsup) formData.append('whatsup', values.whatsup)
            if (values.address) formData.append('address', values.address)
            if (values.facebook) formData.append('facebook', values.facebook)
            if (values.instagram) formData.append('instagram', values.instagram)
            if (values.tiktok) formData.append('tiktok', values.tiktok)

            if (values.light_logo instanceof File) {
                formData.append('light_logo', values.light_logo)
            }
            if (values.dark_logo instanceof File) {
                formData.append('dark_logo', values.dark_logo)
            }
            if (values.favicon instanceof File) {
                formData.append('favicon', values.favicon)
            }

            router.post('/admin/website/setting', formData, {
                onSuccess: () => {
                    toast.success(t('website_setting.success_msg'))
                },
                onError: (errors) => {
                    toast.error(t('website_setting.error_msg'))
                    Object.keys(errors).forEach((key) => {
                        formik.setFieldError(key, errors[key])
                    })
                },
            })
        },
    })

    const tabs = [
        {
            id: 'general',
            label: t('website_setting.general_seo'),
            icon: Globe,
            hasError: !!(
                formik.errors.name_en ||
                formik.errors.name_ar ||
                formik.errors.description_en ||
                formik.errors.description_ar ||
                formik.errors.keywords_en ||
                formik.errors.keywords_ar
            ),
        },
        {
            id: 'branding',
            label: t('website_setting.branding'),
            icon: Palette,
            hasError: !!(formik.errors.light_logo || formik.errors.dark_logo || formik.errors.favicon),
        },
        {
            id: 'contact',
            label: t('website_setting.contact_info'),
            icon: Phone,
            hasError: !!(
                formik.errors.email ||
                formik.errors.phone ||
                formik.errors.whatsup ||
                formik.errors.address
            ),
        },
        {
            id: 'social',
            label: t('website_setting.social_media'),
            icon: Share2,
            hasError: !!(formik.errors.facebook || formik.errors.instagram || formik.errors.tiktok),
        },
    ]

    return (
        <AdminLayout>
            <Head title={t('website_setting.title')} />

            <div className="space-y-6">
                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-main/90 via-main to-second p-6 text-white shadow-lg">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Settings className="h-6 w-6 text-black dark:text-white" />
                                <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                                    {t('website_setting.title')}
                                </h1>
                            </div>
                            <p className="text-sm opacity-90 text-black/80 dark:text-white/80">
                                {t('website_setting.description')}
                            </p>
                        </div>

                        <Button
                            type="button"
                            onClick={() => formik.handleSubmit()}
                            disabled={formik.isSubmitting}
                            className="bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 font-semibold shadow-md self-start md:self-auto"
                        >
                            {formik.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('website_setting.saving')}
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {t('website_setting.save_settings')}
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Main Settings Card */}
                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="border-b border-border/40 pb-4">
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            isActive
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                        } ${tab.hasError ? 'ring-2 ring-red-500' : ''}`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={formik.handleSubmit}>
                            {/* General & SEO Tab */}
                            {activeTab === 'general' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name_en">{t('website_setting.name_en')}</Label>
                                            <Input
                                                id="name_en"
                                                name="name_en"
                                                type="text"
                                                value={formik.values.name_en}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_name_en')}
                                            />
                                            {formik.touched.name_en && formik.errors.name_en && (
                                                <InputError message={String(formik.errors.name_en)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="name_ar">{t('website_setting.name_ar')}</Label>
                                            <Input
                                                id="name_ar"
                                                name="name_ar"
                                                type="text"
                                                value={formik.values.name_ar}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_name_ar')}
                                                dir="rtl"
                                            />
                                            {formik.touched.name_ar && formik.errors.name_ar && (
                                                <InputError message={String(formik.errors.name_ar)} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="description_en">
                                                {t('website_setting.description_en')}
                                            </Label>
                                            <Textarea
                                                id="description_en"
                                                name="description_en"
                                                rows={4}
                                                value={formik.values.description_en}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_description_en')}
                                            />
                                            {formik.touched.description_en && formik.errors.description_en && (
                                                <InputError message={String(formik.errors.description_en)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description_ar">
                                                {t('website_setting.description_ar')}
                                            </Label>
                                            <Textarea
                                                id="description_ar"
                                                name="description_ar"
                                                rows={4}
                                                value={formik.values.description_ar}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_description_ar')}
                                                dir="rtl"
                                            />
                                            {formik.touched.description_ar && formik.errors.description_ar && (
                                                <InputError message={String(formik.errors.description_ar)} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="keywords_en">
                                                {t('website_setting.keywords_en')}
                                            </Label>
                                            <Textarea
                                                id="keywords_en"
                                                name="keywords_en"
                                                rows={3}
                                                value={formik.values.keywords_en}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_keywords_en')}
                                            />
                                            {formik.touched.keywords_en && formik.errors.keywords_en && (
                                                <InputError message={String(formik.errors.keywords_en)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="keywords_ar">
                                                {t('website_setting.keywords_ar')}
                                            </Label>
                                            <Textarea
                                                id="keywords_ar"
                                                name="keywords_ar"
                                                rows={3}
                                                value={formik.values.keywords_ar}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_keywords_ar')}
                                                dir="rtl"
                                            />
                                            {formik.touched.keywords_ar && formik.errors.keywords_ar && (
                                                <InputError message={String(formik.errors.keywords_ar)} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Logos & Branding Tab */}
                            {activeTab === 'branding' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <ImagePicker
                                            id="light_logo"
                                            label={t('website_setting.light_logo')}
                                            accept="image/*"
                                            initialPreview={setting?.light_logo}
                                            onChange={(file) => formik.setFieldValue('light_logo', file)}
                                            disabled={formik.isSubmitting}
                                            error={
                                                formik.touched.light_logo && formik.errors.light_logo
                                                    ? String(formik.errors.light_logo)
                                                    : undefined
                                            }
                                            previewClassName="h-36 object-contain bg-slate-50 p-2 rounded-lg"
                                        />

                                        <ImagePicker
                                            id="dark_logo"
                                            label={t('website_setting.dark_logo')}
                                            accept="image/*"
                                            initialPreview={setting?.dark_logo}
                                            onChange={(file) => formik.setFieldValue('dark_logo', file)}
                                            disabled={formik.isSubmitting}
                                            error={
                                                formik.touched.dark_logo && formik.errors.dark_logo
                                                    ? String(formik.errors.dark_logo)
                                                    : undefined
                                            }
                                            previewClassName="h-36 object-contain bg-slate-900 p-2 rounded-lg"
                                        />

                                        <ImagePicker
                                            id="favicon"
                                            label={t('website_setting.favicon')}
                                            accept="image/*"
                                            initialPreview={setting?.favicon}
                                            onChange={(file) => formik.setFieldValue('favicon', file)}
                                            disabled={formik.isSubmitting}
                                            error={
                                                formik.touched.favicon && formik.errors.favicon
                                                    ? String(formik.errors.favicon)
                                                    : undefined
                                            }
                                            previewClassName="h-36 object-contain p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Contact Info Tab */}
                            {activeTab === 'contact' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t('website_setting.email')}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_email')}
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <InputError message={String(formik.errors.email)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{t('website_setting.phone')}</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_phone')}
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <InputError message={String(formik.errors.phone)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="whatsup">{t('website_setting.whatsup')}</Label>
                                            <Input
                                                id="whatsup"
                                                name="whatsup"
                                                type="text"
                                                value={formik.values.whatsup}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_whatsup')}
                                            />
                                            {formik.touched.whatsup && formik.errors.whatsup && (
                                                <InputError message={String(formik.errors.whatsup)} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">{t('website_setting.address')}</Label>
                                        <Textarea
                                            id="address"
                                            name="address"
                                            rows={3}
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder={t('website_setting.enter_address')}
                                        />
                                        {formik.touched.address && formik.errors.address && (
                                            <InputError message={String(formik.errors.address)} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Social Media Tab */}
                            {activeTab === 'social' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="facebook">{t('website_setting.facebook')}</Label>
                                            <Input
                                                id="facebook"
                                                name="facebook"
                                                type="text"
                                                value={formik.values.facebook}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_facebook')}
                                            />
                                            {formik.touched.facebook && formik.errors.facebook && (
                                                <InputError message={String(formik.errors.facebook)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="instagram">{t('website_setting.instagram')}</Label>
                                            <Input
                                                id="instagram"
                                                name="instagram"
                                                type="text"
                                                value={formik.values.instagram}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_instagram')}
                                            />
                                            {formik.touched.instagram && formik.errors.instagram && (
                                                <InputError message={String(formik.errors.instagram)} />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tiktok">{t('website_setting.tiktok')}</Label>
                                            <Input
                                                id="tiktok"
                                                name="tiktok"
                                                type="text"
                                                value={formik.values.tiktok}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('website_setting.enter_tiktok')}
                                            />
                                            {formik.touched.tiktok && formik.errors.tiktok && (
                                                <InputError message={String(formik.errors.tiktok)} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button Footer */}
                            <div className="mt-8 flex justify-end pt-4 border-t border-border/40">
                                <Button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="px-8 shadow-sm"
                                >
                                    {formik.isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('website_setting.saving')}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {t('website_setting.save_settings')}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
