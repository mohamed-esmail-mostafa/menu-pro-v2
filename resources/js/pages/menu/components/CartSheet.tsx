import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/redux/slices/cartSlice';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft, Utensils } from 'lucide-react';
import useImport from '@/hooks/use-import';
import { router } from '@inertiajs/react';
import { useFormik } from 'formik';
import { Store } from '@/types/store';
import { toast } from 'sonner';

interface CartSheetProps {
    tableId:number;
    store: Store;
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    currency: string;
    totalPrice: number;
    totalCount: number;
    onUpdateQuantity: (productId: number, newQty: number) => void;
    onRemoveItem: (productId: number) => void;
    onClearCart: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({
    tableId,
    store,
    isOpen,
    onClose,
    items,
    currency,
    totalPrice,
    totalCount,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
}) => {
    const { i18n , isAr } = useImport();

    const formik = useFormik({
        initialValues: {
            store_id: store?.id,
            total: totalPrice,
            items: items,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            router.post('/send/order', values as any, {
                onSuccess: () => {
                    toast.success(isAr ? 'تم إرسال الطلب بنجاح' : 'Order placed successfully');
                    onClearCart();
                    onClose();
                },
                onError: () => {
                    toast.error(isAr ? 'حدث خطأ في إرسال الطلب' : 'Failed to place order');
                },
            });
        },
    });

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-border">
                {/* Header */}
                <SheetHeader className="p-4 sm:p-5 border-b border-border text-left rtl:text-right flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <SheetTitle className="text-lg font-bold text-foreground">
                            {isAr ? 'سلة الطلبات' : 'Your Order'}
                        </SheetTitle>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                            {totalCount}
                        </span>
                    </div>

                    {items.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearCart}
                            className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1 h-8 px-2"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isAr ? 'مسح الكل' : 'Clear All'}</span>
                        </Button>
                    )}
                </SheetHeader>

                {/* Body / Items List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-muted-foreground">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                                <Utensils className="w-8 h-8 opacity-40" />
                            </div>
                            <h4 className="font-bold text-foreground text-base">
                                {isAr ? 'السلة فارغة' : 'Your cart is empty'}
                            </h4>
                            <p className="text-xs max-w-xs leading-relaxed">
                                {isAr
                                    ? 'تصفح قائمة الطعام وأضف وجباتك المفضلة لبدء الطلب.'
                                    : 'Browse our delicious menu items and add them to your order.'}
                            </p>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={onClose}
                                className="mt-2 rounded-full text-xs font-semibold"
                            >
                                {isAr ? 'تصفح القائمة' : 'Browse Menu'}
                            </Button>
                        </div>
                    ) : (
                        items.map((item) => {
                            const itemTotal = (item.unitPrice * item.quantity).toFixed(2);
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60 shadow-2xs"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-14 w-14 rounded-lg bg-muted/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Utensils className="w-6 h-6 text-muted-foreground/40" />
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-foreground line-clamp-1">
                                            {item.product.title}
                                        </h4>
                                        <p className="text-xs text-primary font-bold font-mono mt-0.5">
                                            {item.unitPrice.toFixed(2)} {currency}
                                        </p>
                                    </div>

                                    {/* Stepper & Trash */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border border-border rounded-full bg-muted/30 p-0.5">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-6 w-6 p-0 rounded-full hover:bg-background text-foreground"
                                                onClick={() =>
                                                    onUpdateQuantity(item.productId, item.quantity - 1)
                                                }
                                            >
                                                <Minus className="w-3 h-3" />
                                            </Button>
                                            <span className="text-xs font-bold w-6 text-center font-mono">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-6 w-6 p-0 rounded-full hover:bg-background text-foreground"
                                                onClick={() =>
                                                    onUpdateQuantity(item.productId, item.quantity + 1)
                                                }
                                            >
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onRemoveItem(item.productId)}
                                            className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <SheetFooter className="p-4 sm:p-5 border-t border-border bg-muted/20 flex flex-col space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">
                                {isAr ? 'الإجمالي:' : 'Subtotal:'}
                            </span>
                            <span className="text-lg font-black text-primary font-mono">
                                {totalPrice.toFixed(2)} {currency}
                            </span>
                        </div>

                        <Button
                            // onClick={handleSendOrderFromTable}
                            onClick={()=>formik.handleSubmit()}
                            className="w-full h-11 rounded-full font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-md gap-2"
                        >
                            <span>{isAr ? 'إرسال الطلب' : 'Submit Order'}</span>
                            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
