import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import useImport from '@/hooks/use-import'
import { Plus, PlusCircle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Attribute } from '@/types/attributes'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Product } from '@/types/product'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'


interface AttributesDialogProps {
    attributeDialog: any
    setAttributeDialog: any,
    attributes: Attribute[],
    productItem: Product
}
export default function AttributesDialog({ attributeDialog, setAttributeDialog, attributes, productItem }: AttributesDialogProps) {

    const { t } = useImport();


     const formik = useFormik({
        initialValues: {

            rows: productItem ? productItem?.attributes?.flatMap((attribute: any) => attribute?.values.map((value: any) => ({
                id: value.id,
                product_attribute_id: value.product_attribute_id,
                value: value.value,
                price: value.price,
                attribute_name: attribute.name,
                is_default: value.is_default,
                is_required: value.is_required
            }))) :
                [{
                    product_attribute_id: '',
                    value: "",
                    price: 0,
                    is_default: false,
                    is_required: false
                }]

        },
        onSubmit: (values) => {


            router.post("/add/product/attributes", {
                product_id: productItem.id,
                values: values?.rows
            },{
                onSuccess:()=>{
                    toast.success(t("common.success"))
                },
                onError:()=>{
                    toast.success(t("common.error"))
                }
            })
        }
    })


    // const formik = useFormik({
    //     initialValues: {

    //         rows: productItem ? productItem?.product_attributes?.flatMap((attribute: any) => attribute.values.map((value: any) => ({
    //             id: value.id,
    //             product_attribute_id: value.product_attribute_id,
    //             value: value.value,
    //             price: value.price,
    //             attribute_name: attribute.name,
    //             is_default: value.is_default,
    //             is_required: value.is_required
    //         }))) :
    //             [{
    //                 product_attribute_id: '',
    //                 value: "",
    //                 price: 0,
    //                 is_default: false,
    //                 is_required: false
    //             }]

    //     },
    //     onSubmit: (values) => {


    //         router.post("/add/product/attributes", {
    //             product_id: productItem.id,
    //             values: values?.rows
    //         },{
    //             onSuccess:()=>{
    //                 toast.success(t("common.success"))
    //             },
    //             onError:()=>{
    //                 toast.success(t("common.error"))
    //             }
    //         })
    //     }
    // })




    const removeRow = (index: number) => {
        formik.setFieldValue("rows", formik.values.rows.filter((_: any, i: number) => i! == index))
    }

    const addRow = () => {
        formik.setFieldValue("rows", [
            ...formik.values.rows, {
                attribute_id: '',
                value: "",
                price: 0,
                is_default: false,
                is_required: false
            }
        ])
    }


    const removeRow2=(rowId: number)=>{
      router.delete(`/delete/product/attributes/${rowId}` , {
        onSuccess:()=>{
            toast.success(t("common.success"))
        },
        onError:()=>{
            toast.error(t("common.error"))
        }
      })
    }

    return (
        <Dialog open={attributeDialog} onOpenChange={(attributeDialog) => !attributeDialog && setAttributeDialog(false)}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <PlusCircle className="w-5 h-5 text-primary" />
                        {t("common.add-attributes")}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">

                    </DialogDescription>
                </DialogHeader>



                {formik.values.rows.map((row: any, idx: any) => (
                    <div key={idx} className="grid grid-cols-[1fr_1fr_1fr] gap-2 items-end mb-4 border p-2 ">
                        {/* Attribute selector */}
                        <div>
                            {idx === 0 && (
                                <Label className="text-xs mb-1 block">
                                    {t('common.select-attribute')}
                                </Label>
                            )}
                            <Select
                                value={row.attribute_id}
                                onValueChange={(value) => formik.setFieldValue(`rows.${idx}.attribute_id`, value)}
                            >
                                <SelectTrigger className="h-9 text-sm">
                                    <SelectValue placeholder={row.attribute_name ? row.attribute_name : t('common.select-attribute')} />
                                   
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

                        {/* Value text */}
                        <div>
                            {idx === 0 && (
                                <Label className="text-xs mb-1 block">
                                    {t('common.value')}
                                </Label>
                            )}
                            <Input
                                className="h-9 text-sm"
                                placeholder={t('common.value')}
                                value={row.value}
                                // onChange={(e) => updateRow(idx, 'value', e.target.value)}
                                onChange={(e) => formik.setFieldValue(`rows.${idx}.value`, e.target.value)}
                            />
                        </div>

                        {/* Extra price */}
                        <div>
                            {idx === 0 && (
                                <Label className="text-xs mb-1 block">
                                    {t('common.price')}
                                </Label>
                            )}
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                className="h-9 text-sm w-20"
                                value={row.price}
                                // onChange={(e) => updateRow(idx, 'price', e.target.value)}
                                onChange={(e) => formik.setFieldValue(`rows.${idx}.price`, Number(e.target.value))}
                            />
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <Checkbox
                                checked={Boolean(row.is_default)}
                                // value={row.is_default}
                                onCheckedChange={(checked) => formik.setFieldValue(`rows.${idx}.is_default`, checked)} />
                            <Label>{t('common.is_default')}</Label>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <Checkbox
                                checked={Boolean(row.is_required)}
                                value={row.is_required}
                                onCheckedChange={(checked) => formik.setFieldValue(`rows.${idx}.is_required`, checked)} />
                            <Label>{t('common.is_required')}</Label>
                        </div>

                        {/* Remove row */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:bg-destructive/10"
                            onClick={() => removeRow(idx)}
                        // disabled={rows.length === 1}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>


                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:bg-destructive/10"
                            onClick={() => removeRow2(row.id)}
                        // disabled={rows.length === 1}
                        >
                            <Trash2 className="w-4 h-4" />delete
                        </Button>
                    </div>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-1.5 text-xs"
                    onClick={addRow}
                >
                    <Plus className="w-3.5 h-3.5" />
                    {t('common.add-attributes')}
                </Button>

                {/* Product Title */}
                <div className="space-y-1.5">

                </div>






                {/* Dialog Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setAttributeDialog(false)}
                    // disabled={formik.isSubmitting}
                    >
                        {t('common.cancel')}
                    </Button>

                    <Button
                        // type="submit"
                        onClick={() => formik.handleSubmit()}
                        // disabled={formik.isSubmitting}
                        className="bg-primary text-primary-foreground font-medium"
                    >
                        {/* {formik.isSubmitting && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )} */}
                        {t("common.save")}
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
