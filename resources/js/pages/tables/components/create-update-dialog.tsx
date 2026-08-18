
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import useImport from '@/hooks/use-import'
import { Store } from '@/types/store'
import { useState } from 'react'
import { Table } from '@/types/table'
import InputError from '@/components/input-error'
import { toast } from 'sonner'


export default function CreateUpdateDialog({ store }: { store: Store }) {
    const { t } = useImport()
    const [showDialog, setShowDialog] = useState(false)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)


    const validationSchema = Yup.object({
        name: Yup.string().required(t('validations.required')),
        capacity: Yup.number().required(t('validations.required')).min(1, t('validations.capacity-min')).integer(t('validations.capacity-integer')),
    })

    // const formik = useFormik({
    //     initialValues: {
    //         store_id:store.id,
    //         name: selectedTable?.name || '',
    //         capacity: selectedTable?.capacity || 4,
    //     },
    //     validationSchema,
    //     enableReinitialize: true,
    //     onSubmit: (values) => {


    //          router.post(`/create/store/tables`), values, {
    //                 onSuccess: () => {
    //                     formik.resetForm()
    //                 },
    //                 onError: (errors:any) => {
    //                     console.error('Creation failed:', errors)
    //                 }
    //             })
    //         }}
    //     },
    // })


    const formik = useFormik({
        initialValues: {
            store_id: store.id,
            name: selectedTable?.name || '',
            capacity: selectedTable?.capacity || 4,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            router.post(`/create/store/tables`, values, {
                onSuccess: () => {
                    toast.success(t('common.create-success'))
                    formik.resetForm()
                    setShowDialog(false)
                },
                onError: (errors: any) => {
                    toast.success(t('common.create-error'))
                },
            })
        }
    })
    return (
        <div>


            <div>

                <Button onClick={() => setShowDialog(true)}>{t("tables.add-new-table")}</Button>
            </div>
            <Dialog open={showDialog} onOpenChange={(showDialog) => !showDialog}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>
                            {/* {isEdit ? t('tables.edit-table') : t('tables.add-table')} */}
                        </DialogTitle>

                    </DialogHeader>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('tables.table-name')}
                            </label>
                            <Input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('tables.enter-table-name')}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <InputError message={String(formik.errors.name)} />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('tables.capacity')}
                            </label>
                            <Input
                                type="number"
                                name="capacity"
                                value={formik.values.capacity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min="1"
                                placeholder={t('tables.enter-capacity')}
                            />
                            {formik.touched.capacity && formik.errors.capacity && (
                                <InputError message={String(formik.errors.capacity)} />
                            )}
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                onClick={() => setShowDialog(false)}
                                variant="ghost"
                                className="flex-1 "
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="flex-1"
                            >
                                gfg
                                {/* {formik.isSubmitting ? t('common.saving') : isEdit ? t('common.update') : t('common.save')} */}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
