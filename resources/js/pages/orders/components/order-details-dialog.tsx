import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus } from '@/types/order';
import { Store } from '@/types/store';
import useImport from '@/hooks/use-import';
import {
    Clock,
    Flame,
    BellRing,
    Truck,
    CheckCircle,
    CheckCircle2,
    XCircle,
    User,
    Phone,
    MapPin,
    Calendar,
    CreditCard,
    DollarSign,
    Utensils,
    FileText,
    Hash,
    Printer,
    ChevronDown,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrderDetailsDialogProps {
    order: Order | null;
    store: Store | null;
    open: boolean;
    onClose: () => void;
    onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
    onOpenReceipt: (order: Order) => void;
    updatingId: number | null;
}

export const STATUS_CONFIG: Record<OrderStatus, {
    labelAr: string;
    labelEn: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    icon: any;
}> = {
    pending: {
        labelAr: 'قيد الانتظار',
        labelEn: 'Pending',
        bgClass: 'bg-amber-500/10 dark:bg-amber-950/40',
        textClass: 'text-amber-700 dark:text-amber-300',
        borderClass: 'border-amber-300 dark:border-amber-700',
        icon: Clock,
    },
    confirmed: {
        labelAr: 'تم التأكيد',
        labelEn: 'Confirmed',
        bgClass: 'bg-sky-500/10 dark:bg-sky-950/40',
        textClass: 'text-sky-700 dark:text-sky-300',
        borderClass: 'border-sky-300 dark:border-sky-700',
        icon: CheckCircle2,
    },
    preparing: {
        labelAr: 'جاري التحضير',
        labelEn: 'Preparing',
        bgClass: 'bg-indigo-500/10 dark:bg-indigo-950/40',
        textClass: 'text-indigo-700 dark:text-indigo-300',
        borderClass: 'border-indigo-300 dark:border-indigo-700',
        icon: Flame,
    },
    ready: {
        labelAr: 'جاهز للتقديم',
        labelEn: 'Ready',
        bgClass: 'bg-teal-500/10 dark:bg-teal-950/40',
        textClass: 'text-teal-700 dark:text-teal-300',
        borderClass: 'border-teal-300 dark:border-teal-700',
        icon: BellRing,
    },
    out_for_delivery: {
        labelAr: 'خرج للتوصيل',
        labelEn: 'Out for Delivery',
        bgClass: 'bg-blue-500/10 dark:bg-blue-950/40',
        textClass: 'text-blue-700 dark:text-blue-300',
        borderClass: 'border-blue-300 dark:border-blue-700',
        icon: Truck,
    },
    delivered: {
        labelAr: 'مكتمل / تم التسليم',
        labelEn: 'Delivered',
        bgClass: 'bg-emerald-500/10 dark:bg-emerald-950/40',
        textClass: 'text-emerald-700 dark:text-emerald-300',
        borderClass: 'border-emerald-300 dark:border-emerald-700',
        icon: CheckCircle,
    },
    cancelled: {
        labelAr: 'ملغي',
        labelEn: 'Cancelled',
        bgClass: 'bg-rose-500/10 dark:bg-rose-950/40',
        textClass: 'text-rose-700 dark:text-rose-300',
        borderClass: 'border-rose-300 dark:border-rose-700',
        icon: XCircle,
    },
};

export default function OrderDetailsDialog({
    order,
    store,
    open,
    onClose,
    onStatusChange,
    onOpenReceipt,
    updatingId,
}: OrderDetailsDialogProps) {
    const { isAr } = useImport();

    if (!order) return null;

    const currentStatusConfig = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
    const StatusIcon = currentStatusConfig.icon;

    const formattedDate = new Date(order.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    const total = parseFloat(order.total?.toString() || '0');
    const subtotal = parseFloat(order.subtotal?.toString() || '0');
    const tax = parseFloat(order.tax?.toString() || '0');
    const delivery = parseFloat(order.delivery_fee?.toString() || '0');
    const discount = parseFloat(order.discount?.toString() || '0');

    const allStatuses: OrderStatus[] = [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'out_for_delivery',
        'delivered',
        'cancelled',
    ];

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto p-6 rounded-2xl">
                <DialogHeader className="pb-4 border-b">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl border ${currentStatusConfig.bgClass} ${currentStatusConfig.borderClass}`}>
                                <StatusIcon className={`w-6 h-6 ${currentStatusConfig.textClass}`} />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                    <span>{isAr ? 'طلب' : 'Order'} #{order.order_number}</span>
                                    {order.table_no && (
                                        <Badge variant="secondary" className="font-mono text-xs">
                                            {isAr ? `طاولة #${order.table_no}` : `Table #${order.table_no}`}
                                        </Badge>
                                    )}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formattedDate}</span>
                                </DialogDescription>
                            </div>
                        </div>

                        {/* Top Action Header */}
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onOpenReceipt(order)}
                                className="gap-1.5 text-xs font-semibold rounded-xl"
                            >
                                <Printer className="w-4 h-4 text-primary" />
                                <span>{isAr ? 'طباعة' : 'Print'}</span>
                            </Button>

                            {/* Status Change Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="sm"
                                        disabled={updatingId === order.id}
                                        className={`gap-1.5 rounded-xl text-xs font-bold ${currentStatusConfig.bgClass} ${currentStatusConfig.textClass} border ${currentStatusConfig.borderClass} hover:opacity-90`}
                                    >
                                        <StatusIcon className="w-4 h-4" />
                                        <span>{isAr ? currentStatusConfig.labelAr : currentStatusConfig.labelEn}</span>
                                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
                                    {allStatuses.map((st) => {
                                        const cfg = STATUS_CONFIG[st];
                                        const StIcon = cfg.icon;
                                        return (
                                            <DropdownMenuItem
                                                key={st}
                                                onClick={() => onStatusChange(order.id, st)}
                                                className={`gap-2 cursor-pointer text-xs font-medium rounded-lg py-2 ${
                                                    order.order_status === st ? 'bg-accent font-bold' : ''
                                                }`}
                                            >
                                                <StIcon className={`w-4 h-4 ${cfg.textClass}`} />
                                                <span>{isAr ? cfg.labelAr : cfg.labelEn}</span>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {/* Customer & Info Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Customer Details */}
                        <div className="p-4 rounded-xl border bg-card/60 space-y-2">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <User className="w-4 h-4 text-primary" />
                                <span>{isAr ? 'بيانات العميل' : 'Customer Info'}</span>
                            </h4>
                            <div className="space-y-1 text-xs">
                                <p className="font-semibold text-foreground">
                                    {order.name || (isAr ? 'طلب مباشر (بدون اسم)' : 'Direct Order')}
                                </p>
                                {order.phone && (
                                    <p className="text-muted-foreground flex items-center gap-1.5" dir="ltr">
                                        <Phone className="w-3.5 h-3.5 text-muted-foreground/70" />
                                        <span>{order.phone}</span>
                                    </p>
                                )}
                                {order.address && (
                                    <p className="text-muted-foreground flex items-start gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0 mt-0.5" />
                                        <span>{order.address}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Payment & Status Info */}
                        <div className="p-4 rounded-xl border bg-card/60 space-y-2">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <span>{isAr ? 'بيانات الدفع' : 'Payment Details'}</span>
                            </h4>
                            <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">{isAr ? 'حالة الدفع:' : 'Payment Status:'}</span>
                                    <Badge
                                        variant="outline"
                                        className={
                                            order.payment_status === 'paid'
                                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-300'
                                                : 'bg-amber-500/10 text-amber-600 border-amber-300'
                                        }
                                    >
                                        {order.payment_status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">{isAr ? 'طريقة الدفع:' : 'Method:'}</span>
                                    <span className="font-semibold uppercase text-foreground">{order.payment_method}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Note if any */}
                    {order.note && (
                        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-500/5 text-xs space-y-1">
                            <h5 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                                <FileText className="w-4 h-4" />
                                <span>{isAr ? 'ملاحظات الطلب:' : 'Order Note:'}</span>
                            </h5>
                            <p className="text-muted-foreground leading-relaxed">{order.note}</p>
                        </div>
                    )}

                    {/* Order Items Table */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold flex items-center justify-between text-foreground">
                            <span className="flex items-center gap-2">
                                <Utensils className="w-4 h-4 text-primary" />
                                {isAr ? 'عناصر الطلب' : 'Ordered Items'}
                            </span>
                            <Badge variant="secondary" className="font-mono text-xs">
                                {order.order_items?.length || 0} {isAr ? 'أصناف' : 'items'}
                            </Badge>
                        </h4>

                        <div className="border rounded-xl overflow-hidden bg-card">
                            <table className="w-full text-xs">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="p-3 text-start font-bold">{isAr ? 'اسم المنتج' : 'Item Name'}</th>
                                        <th className="p-3 text-center font-bold">{isAr ? 'السعر' : 'Unit Price'}</th>
                                        <th className="p-3 text-center font-bold">{isAr ? 'الكمية' : 'Qty'}</th>
                                        <th className="p-3 text-end font-bold">{isAr ? 'الإجمالي' : 'Total'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {order.order_items && order.order_items.length > 0 ? (
                                        order.order_items.map((item) => {
                                            const price = parseFloat(item.price?.toString() || '0');
                                            const itemTotal = item.total ? parseFloat(item.total.toString()) : price * item.quantity;
                                            return (
                                                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                                    <td className="p-3 font-semibold text-foreground">
                                                        <div>{item.product_name}</div>
                                                        {item.notes && (
                                                            <div className="text-[11px] text-muted-foreground font-normal mt-0.5">
                                                                {item.notes}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-center font-mono text-muted-foreground">
                                                        {price.toFixed(2)}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold font-mono">
                                                            {item.quantity}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-end font-bold font-mono text-foreground">
                                                        {itemTotal.toFixed(2)}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-6 text-center text-muted-foreground italic">
                                                {isAr ? 'لا توجد عناصر في هذا الطلب' : 'No order items found'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="p-4 rounded-xl bg-muted/40 border space-y-2 text-xs">
                        {subtotal > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                                <span className="font-mono font-bold">{subtotal.toFixed(2)}</span>
                            </div>
                        )}
                        {tax > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>{isAr ? 'الضريبة:' : 'Tax:'}</span>
                                <span className="font-mono font-bold">{tax.toFixed(2)}</span>
                            </div>
                        )}
                        {delivery > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>{isAr ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
                                <span className="font-mono font-bold">{delivery.toFixed(2)}</span>
                            </div>
                        )}
                        {discount > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>{isAr ? 'الخصم:' : 'Discount:'}</span>
                                <span className="font-mono font-bold">-{discount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center text-sm font-black pt-2 border-t text-foreground">
                            <span>{isAr ? 'المبلغ الإجمالي:' : 'Grand Total:'}</span>
                            <span className="text-lg font-mono text-primary">{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
