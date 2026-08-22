import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import {
    Plus,
    Edit,
    Trash2,
    Image as ImageIcon,
    Layers,
    Search,
    X,
    Loader2,
    AlertTriangle,
    Tag
} from 'lucide-react';
import PageHeader from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import ImagePicker from '@/components/ui/image-picker';
import InputError from '@/components/input-error';
import useImport from '@/hooks/use-import';
import AdminLayout from '@/layouts/admin-layout';
import { Category } from '@/types/category';
import NoCategories from './components/no-categories';
import AdminCategoryCard from './components/admin-category-card';

export default function AdminCategories({ categories = [] }: { categories: Category[] }) {
    const { t } = useImport();

    // Dialog States
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Search filter
    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categories;
        const q = searchQuery.toLowerCase().trim();
        return categories.filter(
            (c) =>
                c.name?.toLowerCase().includes(q) ||
                c.slug?.toLowerCase().includes(q) ||
                c.description?.toLowerCase().includes(q)
        );
    }, [categories, searchQuery]);

    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required(t('common.required', 'Required')),
        description: Yup.string().nullable(),
        position: Yup.number().nullable().typeError(t('common.must-be-number', 'Must be a number')),
        image: Yup.mixed().nullable(),
    });

    // Formik Form
    const formik = useFormik({
        initialValues: {
            name: editingCategory ? editingCategory.name || '' : '',
            description: editingCategory ? editingCategory.description || '' : '',
            position: editingCategory ? (editingCategory.position ?? 0) : categories.length + 1,
            image: editingCategory ? editingCategory.image || null : (null as File | string | null),
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.description) formData.append('description', values.description);
            if (values.position !== null && values.position !== undefined) {
                formData.append('position', values.position.toString());
            }
            if (values.image instanceof File) {
                formData.append('image', values.image);
            }

            if (editingCategory) {
                // Update
                router.post(`/store/categories/update/${editingCategory.id}`, formData, {
                    onSuccess: () => {
                        toast.success(t('common.success', 'Updated successfully'));
                        handleCloseDialog();
                    },
                    onError: (errors) => {
                        toast.error(t('common.error_happened', 'An error occurred'));
                        Object.keys(errors).forEach((key) => {
                            formik.setFieldError(key, errors[key]);
                        });
                    },
                    onFinish: () => setIsSubmitting(false),
                });
            } else {
                // Create
                router.post('/store/categories', formData, {
                    onSuccess: () => {
                        toast.success(t('common.success', 'Category created successfully'));
                        handleCloseDialog();
                    },
                    onError: (errors) => {
                        toast.error(t('common.error_happened', 'An error occurred'));
                        Object.keys(errors).forEach((key) => {
                            formik.setFieldError(key, errors[key]);
                        });
                    },
                    onFinish: () => setIsSubmitting(false),
                });
            }
        },
    });

    const handleOpenCreate = () => {
        setEditingCategory(null);
        setOpenDialog(true);
    };

    const handleOpenEdit = (category: Category) => {
        setEditingCategory(category);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCategory(null);
    };

    const handleOpenDelete = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const ConfirmDelete = () => {
        if (!categoryToDelete) return;
        setIsSubmitting(true);
        router.delete(`/store/categories/${categoryToDelete.id}`, {
            onSuccess: () => {
                toast.success(t('common.success', 'Category deleted successfully'));
                setDeleteDialogOpen(false);
                setCategoryToDelete(null);
            },
            onError: () => {
                toast.error(t('common.error_happened', 'An error occurred'));
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <AdminLayout>
            <Head title={t('categories.title', 'Categories')} />

            <div className="space-y-6">
                {/* Page Header */}
                <PageHeader
                    title={t('categories.title', 'Categories')}
                    count={categories.length}
                    subtitle={t('categories.subtitle', 'Manage global system categories')}
                    icon={<Layers className="w-6 h-6 text-primary" />}
                >
                    <Button onClick={handleOpenCreate} className="rounded-xl font-semibold gap-2 shadow-sm cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>{t('categories.add-category', 'Add Category')}</span>
                    </Button>
                </PageHeader>

                {/* Filter and Search Bar */}
                {categories.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80 md:w-96">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:right-3.5 rtl:left-auto" />
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('categories.search-placeholder', 'Search categories...')}
                                className="pl-10 pr-9 rtl:pr-10 rtl:pl-9 rounded-xl bg-background border-border/80 focus:border-primary"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rtl:left-3 rtl:right-auto cursor-pointer"
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <Badge variant="secondary" className="px-3.5 py-1.5 rounded-lg text-xs font-medium gap-1.5 border border-border/50 self-end sm:self-center">
                            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>{t('categories.title', 'Categories')}:</span>
                            <span className="font-bold text-primary">{categories.length}</span>
                        </Badge>
                    </div>
                    
                )}

                {/* Categories Grid */}
                {categories.length === 0 ? (
                   <NoCategories handleOpenCreate={handleOpenCreate}/>
                ) : filteredCategories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 rounded-2xl border border-border bg-card/40 text-center space-y-3">
                        <Search className="w-10 h-10 text-muted-foreground/60" />
                        <p className="text-sm font-medium text-muted-foreground">
                            {t('stores.no-stores-matching', 'No categories match your search query.')}
                        </p>
                        <Button variant="outline" onClick={() => setSearchQuery('')} className="rounded-xl text-xs cursor-pointer">
                            {t('stores.clear-search', 'Clear search')}
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {filteredCategories.map((category: Category) => (
                           <AdminCategoryCard category={category} handleOpenEdit={handleOpenEdit} handleOpenDelete={handleOpenDelete} />
                        ))}
                    </div>
                )}

                {/* Create & Edit Dialog */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="max-w-md sm:max-w-lg p-6 rounded-2xl border border-border">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-foreground">
                                {editingCategory
                                    ? t('categories.edit-category', 'Edit Category')
                                    : t('categories.add-category', 'Add New Category')}
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                {editingCategory
                                    ? t('categories.edit-desc', 'Update category details and image below.')
                                    : t('categories.add-desc', 'Fill in the category details to create a new category.')}
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={formik.handleSubmit} className="space-y-4 pt-2">
                            {/* Category Image Picker */}
                            <div className="space-y-1.5">
                                <ImagePicker
                                    id="category-image"
                                    label={t('categories.image', 'Category Image')}
                                    initialPreview={editingCategory?.image || null}
                                    onChange={(file) => formik.setFieldValue('image', file)}
                                    error={formik.touched.image && formik.errors.image ? (formik.errors.image as string) : undefined}
                                />
                            </div>

                            {/* Name Input */}
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-xs font-semibold">
                                    {t('categories.category-name', 'Category Name')} <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="e.g. Desserts, Beverages, Main Course"
                                    className="rounded-xl"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <InputError message={formik.errors.name} />
                                )}
                            </div>

                            {/* Description Input */}
                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-xs font-semibold">
                                    {t('categories.description', 'Description')}
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Optional description of the category..."
                                    rows={3}
                                    className="rounded-xl resize-none"
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <InputError message={formik.errors.description} />
                                )}
                            </div>

                            {/* Position Input */}
                            <div className="space-y-1.5">
                                <Label htmlFor="position" className="text-xs font-semibold">
                                    {t('categories.position', 'Position / Display Order')}
                                </Label>
                                <Input
                                    id="position"
                                    name="position"
                                    type="number"
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="rounded-xl"
                                />
                                {formik.touched.position && formik.errors.position && (
                                    <InputError message={formik.errors.position as string} />
                                )}
                            </div>

                            <DialogFooter className="pt-4 border-t border-border/60 gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseDialog}
                                    disabled={isSubmitting}
                                    className="rounded-xl cursor-pointer"
                                >
                                    {t('common.cancel', 'Cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-xl font-semibold gap-2 min-w-[100px] cursor-pointer"
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{t('common.save', 'Save')}</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent className="max-w-md p-6 rounded-2xl border border-border">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <DialogTitle className="text-lg font-bold">
                                        {t('categories.delete-confirm-title', 'Delete Category')}
                                    </DialogTitle>
                                    <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                        {t(
                                            'categories.delete-confirm-desc',
                                            'Are you sure you want to delete this category? This action cannot be undone.'
                                        )}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {categoryToDelete && (
                            <div className="p-3 my-2 rounded-xl bg-muted/50 border border-border/60 flex items-center gap-3">
                                {categoryToDelete.image ? (
                                    <img
                                        src={categoryToDelete.image}
                                        alt={categoryToDelete.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                        <ImageIcon className="w-6 h-6 opacity-40" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-sm text-foreground">{categoryToDelete.name}</p>
                                    <p className="text-xs text-muted-foreground">/{categoryToDelete.slug}</p>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="gap-2 sm:gap-0 pt-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setDeleteDialogOpen(false);
                                    setCategoryToDelete(null);
                                }}
                                disabled={isSubmitting}
                                className="rounded-xl cursor-pointer"
                            >
                                {t('common.cancel', 'Cancel')}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={ConfirmDelete}
                                disabled={isSubmitting}
                                className="rounded-xl font-semibold gap-2 cursor-pointer"
                            >
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{t('common.delete', 'Delete')}</span>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
