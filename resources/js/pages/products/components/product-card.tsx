import { Product } from '@/types/product'
import { Edit, Star, Tag, Trash2, Utensils } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import { Store } from '@/types/store'
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import {Link} from '@inertiajs/react'

interface ProductCardProps {
    productItem: Product,
    store: Store,
    // deletingId?: any,
    // handleOpenEdit?: any,
    // attributes: Attribute[]
}

export default function ProductCard({ store,productItem }: ProductCardProps) {
    const { t } = useImport()
    // const isDeleting = deletingId === productItem.id
    
    const hasDiscount = productItem.sale_price && Number(productItem.sale_price) < Number(productItem.price)
    // const [attributeDialog, setAttributeDialog] = useState(false);
    const [deleteDialogShow, setDeleteDialog] = useState(false)
    const [deletedItem, setDeletedItem] = useState<Product | null>(null)


    const handleDeleteProduct = () => {
        router.delete(`/store/product/delete/${deletedItem?.id}`, {
            onSuccess: () => {
                toast.success(t('common.success'))
            },
            onError: () => {
                toast.error(t('common.error'))
            },

        })
    }

    return (
        <>
            <div
                key={productItem.id}
                className="group relative rounded-xl border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
                <div>
                    <div className="relative aspect-video rounded-lg bg-muted mb-3 overflow-hidden border">
                        {productItem.image ? (
                            <img
                                src={productItem?.image}
                                alt={productItem.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <Utensils className="w-8 h-8 opacity-20 text-muted-foreground" />
                            </div>
                        )}

                        {productItem.is_featured && (
                            <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 text-white gap-1 text-[10px] shadow-sm">
                                <Star className="w-3 h-3 fill-current" />
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base truncate">{productItem.title}</h3>
                        {productItem.storeCategory && (
                            <Badge variant="secondary" className="text-[10px] shrink-0 font-normal">
                                <Tag className="w-2.5 h-2.5 mr-1 inline opacity-60" />
                                {productItem.storeCategory.name}
                            </Badge>
                        )}
                    </div>

                    {productItem.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {productItem.description}
                        </p>
                    )}

                    <div className="flex items-baseline gap-2 mt-2">
                        {hasDiscount ? (
                            <>
                                <span className="text-base font-bold text-primary">
                                    {productItem.sale_price}
                                </span>
                                <span className="text-xs text-muted-foreground line-through">
                                    {productItem.price}
                                </span>
                            </>
                        ) : (
                            <span className="text-base font-bold text-primary">
                                {productItem.price} {store?.country?.currency_ar}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t">
                    <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1 text-xs"
                    >
                        <Link href={`/update/product/page/${productItem.id}`}>
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            {t('common.edit')}
                        </Link>
                    </Button>
                    {/* <Button
                        size="sm"
                        variant="default"
                        onClick={() => setAttributeDialog(true)}
                        className="flex-1 text-xs"
                    >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        {t('common.add-attributes')}
                    </Button> */}
                    <Button
                        size="sm"
                        variant="destructive"
                        // disabled={isDeleting}
                        // onClick={() => handleDeleteProduct(productItem.id)}
                        onClick={() => {
                            setDeletedItem(productItem)
                            setDeleteDialog(true)
                        }}
                        className="text-xs"
                    >
                        {/* {isDeleting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                        )} */}
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            {/* Attibutes dialog */}
            {/* <AttributesDialog
                productItem={productItem}
                attributeDialog={attributeDialog}
                setAttributeDialog={setAttributeDialog}
                attributes={attributes}
            /> */}


            <Dialog open={deleteDialogShow} onOpenChange={() => setDeleteDialog(false)}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>
                            {t('common.delete')}
                        </DialogTitle>

                    </DialogHeader>
                    <div className='flex flex-col items-center justify-center'>
                        <Trash2 size={40} />

                        <h4>{t("common.delete-confirm")}</h4>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setDeleteDialog(false)}>
                            {t("common.cancel")}
                        </Button>

                        <Button variant="destructive" onClick={() => handleDeleteProduct()}>
                            {t("common.delete")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
