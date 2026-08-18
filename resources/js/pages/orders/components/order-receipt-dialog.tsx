import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';
import { Store } from '@/types/store';
import useImport from '@/hooks/use-import';
import { Printer, Store as StoreIcon, Phone, MapPin, Calendar, Hash, Utensils } from 'lucide-react';

interface OrderReceiptDialogProps {
    order: Order | null;
    store: Store | null;
    open: boolean;
    onClose: () => void;
}

export default function OrderReceiptDialog({
    order,
    store,
    open,
    onClose,
}: OrderReceiptDialogProps) {
    const { isAr } = useImport();

    if (!order) return null;

    const handlePrint = () => {
        const printContent = document.getElementById('printable-receipt');
        if (!printContent) return;

        const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        if (!winPrint) return;

        winPrint.document.write(`
            <!DOCTYPE html>
            <html dir="${isAr ? 'rtl' : 'ltr'}">
            <head>
                <title>${isAr ? 'إيصال طلب' : 'Order Receipt'} #${order.order_number}</title>
                <style>
                    body {
                        font-family: system-ui, -apple-system, sans-serif;
                        width: 80mm;
                        margin: 0 auto;
                        padding: 12px;
                        color: #000;
                        background: #fff;
                    }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .text-left { text-align: left; }
                    .bold { font-weight: bold; }
                    .divider { border-bottom: 1px dashed #000; margin: 8px 0; }
                    table { width: 100%; border-collapse: collapse; margin: 8px 0; }
                    th, td { text-align: start; padding: 4px 0; font-size: 12px; }
                    .total-row { font-size: 14px; font-weight: bold; }
                    @media print {
                        @page { margin: 0; size: 80mm auto; }
                    }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        window.close();
                    }
                </script>
            </body>
            </html>
        `);
        winPrint.document.close();
    };

    const formattedDate = new Date(order.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    const total = parseFloat(order.total?.toString() || '0');
    const subtotal = parseFloat(order.subtotal?.toString() || '0');
    const tax = parseFloat(order.tax?.toString() || '0');
    const delivery = parseFloat(order.delivery_fee?.toString() || '0');
    const discount = parseFloat(order.discount?.toString() || '0');

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
                <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b">
                    <DialogTitle className="text-lg font-bold flex items-center gap-2">
                        <Printer className="w-5 h-5 text-primary" />
                        <span>{isAr ? 'إيصال الفاتورة' : 'Order Receipt'}</span>
                    </DialogTitle>
                    <Button onClick={handlePrint} size="sm" className="gap-2 bg-primary text-primary-foreground">
                        <Printer className="w-4 h-4" />
                        <span>{isAr ? 'طباعة' : 'Print'}</span>
                    </Button>
                </DialogHeader>

                {/* Printable Receipt Container */}
                <div id="printable-receipt" className="bg-muted/20 p-4 rounded-xl border border-dashed text-foreground space-y-4 font-mono text-sm">
                    {/* Header */}
                    <div className="text-center space-y-1 pb-3 border-b border-dashed">
                        {store?.image ? (
                            <img src={store.image} alt={store.name} className="w-12 h-12 rounded-full mx-auto object-cover border mb-2" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-1">
                                <StoreIcon className="w-5 h-5" />
                            </div>
                        )}
                        <h3 className="font-bold text-base text-foreground tracking-tight">
                            {store?.name || (isAr ? 'اسم المطعم' : 'Restaurant')}
                        </h3>
                        {store?.phone && (
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span dir="ltr">{store.phone}</span>
                            </p>
                        )}
                        {store?.address && (
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{store.address}</span>
                            </p>
                        )}
                    </div>

                    {/* Meta details */}
                    <div className="text-xs space-y-1 py-2 border-b border-dashed">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{isAr ? 'رقم الطلب:' : 'Order #:'}</span>
                            <span className="font-bold">{order.order_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{isAr ? 'التاريخ:' : 'Date:'}</span>
                            <span>{formattedDate}</span>
                        </div>
                        {order.table_no && (
                            <div className="flex justify-between font-bold text-primary">
                                <span>{isAr ? 'الطاولة:' : 'Table #:'}</span>
                                <span>#{order.table_no}</span>
                            </div>
                        )}
                        {order.name && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{isAr ? 'العميل:' : 'Customer:'}</span>
                                <span>{order.name}</span>
                            </div>
                        )}
                        {order.phone && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{isAr ? 'الهاتف:' : 'Phone:'}</span>
                                <span dir="ltr">{order.phone}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{isAr ? 'طريقة الدفع:' : 'Payment:'}</span>
                            <span className="capitalize">{order.payment_method}</span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="py-2 border-b border-dashed">
                        <h4 className="text-xs font-bold mb-2 flex items-center gap-1 text-muted-foreground">
                            <Utensils className="w-3.5 h-3.5" />
                            <span>{isAr ? 'الأصناف' : 'Items'}</span>
                        </h4>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-dashed text-muted-foreground">
                                    <th className="text-start pb-1">{isAr ? 'الصنف' : 'Item'}</th>
                                    <th className="text-center pb-1">{isAr ? 'الكمية' : 'Qty'}</th>
                                    <th className="text-end pb-1">{isAr ? 'السعر' : 'Price'}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dashed">
                                {order.order_items && order.order_items.length > 0 ? (
                                    order.order_items.map((item) => {
                                        const itemPrice = parseFloat(item.price?.toString() || '0');
                                        const itemTotal = item.total ? parseFloat(item.total.toString()) : itemPrice * item.quantity;
                                        return (
                                            <tr key={item.id}>
                                                <td className="py-1.5 font-medium">
                                                    <div>{item.product_name}</div>
                                                    {item.notes && <div className="text-[10px] text-muted-foreground font-sans">({item.notes})</div>}
                                                </td>
                                                <td className="py-1.5 text-center font-bold">x{item.quantity}</td>
                                                <td className="py-1.5 text-end font-bold">{itemTotal.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="py-2 text-center text-muted-foreground italic">
                                            {isAr ? 'لا توجد عناصر في هذا الطلب' : 'No items'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Summary */}
                    <div className="space-y-1 text-xs pt-1">
                        {subtotal > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                                <span>{subtotal.toFixed(2)}</span>
                            </div>
                        )}
                        {tax > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>{isAr ? 'الضريبة:' : 'Tax:'}</span>
                                <span>{tax.toFixed(2)}</span>
                            </div>
                        )}
                        {delivery > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>{isAr ? 'التوصيل:' : 'Delivery:'}</span>
                                <span>{delivery.toFixed(2)}</span>
                            </div>
                        )}
                        {discount > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>{isAr ? 'الخصم:' : 'Discount:'}</span>
                                <span>-{discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-base font-black pt-2 border-t border-dashed text-foreground">
                            <span>{isAr ? 'الإجمالي النهائي:' : 'Total:'}</span>
                            <span className="text-primary">{total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-3 text-[11px] text-muted-foreground font-sans border-t border-dashed">
                        <p className="font-semibold">{isAr ? 'شكرًا لزيارتكم! 🍔' : 'Thank you for your order!'}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
