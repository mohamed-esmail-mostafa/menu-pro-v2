import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus } from '@/types/order';
import useImport from '@/hooks/use-import';
import { STATUS_CONFIG } from './order-details-dialog';
import {
    Calendar,
    Clock,
    User,
    Phone,
    MapPin,
    Eye,
    Printer,
    ChevronDown,
    Utensils,
    DollarSign,
    CheckCircle2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrderCardProps {
    order: Order;
    onViewDetails: (order: Order) => void;
    onOpenReceipt: (order: Order) => void;
    onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
    updatingId: number | null;
}

export default function OrderCard({
    order,
    onViewDetails,
    onOpenReceipt,
    onStatusChange,
    updatingId,
}: OrderCardProps) {
    const { isAr } = useImport();
    const config = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
    const StatusIcon = config.icon;

    const formattedDate = new Date(order.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
    });

    const total = parseFloat(order.total?.toString() || '0');
    const itemsCount = order.order_items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    const nextStatuses: Record<OrderStatus, OrderStatus | null> = {
        pending: 'preparing',
        confirmed: 'preparing',
        preparing: 'ready',
        ready: 'delivered',
        out_for_delivery: 'delivered',
        delivered: null,
        cancelled: null,
    };

    const nextStatus = nextStatuses[order.order_status];

    return (
        <Card className="rounded-2xl border border-border/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden bg-card/90">
            {/* Top Bar / Header */}
            <CardHeader className="p-4 border-b bg-muted/20 pb-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-black text-foreground">
                            #{order.order_number}
                        </span>
                        {order.table_no && (
                            <Badge variant="secondary" className="font-mono text-xs bg-primary/10 text-primary border-primary/20">
                                {isAr ? `طاولة #${order.table_no}` : `Table #${order.table_no}`}
                            </Badge>
                        )}
                    </div>

                    {/* Status Badge */}
                    <Badge
                        variant="outline"
                        className={`gap-1.5 px-2.5 py-1 text-xs font-bold ${config.bgClass} ${config.textClass} ${config.borderClass}`}
                    >
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{isAr ? config.labelAr : config.labelEn}</span>
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                </div>
            </CardHeader>

            {/* Content Body */}
            <CardContent className="p-4 space-y-3.5 flex-1">
                {/* Customer Details snippet */}
                {(order.name || order.phone || order.address) && (
                    <div className="text-xs space-y-1 bg-muted/40 p-2.5 rounded-xl border">
                        {order.name && (
                            <div className="font-semibold text-foreground flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-primary" />
                                <span>{order.name}</span>
                            </div>
                        )}
                        {order.phone && (
                            <div className="text-muted-foreground flex items-center gap-1.5" dir="ltr">
                                <Phone className="w-3 h-3 text-muted-foreground/70" />
                                <span>{order.phone}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Items Summary Preview */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Utensils className="w-3.5 h-3.5 text-primary" />
                            <span>{isAr ? 'قائمة الطلب' : 'Items'}</span>
                        </span>
                        <span className="font-mono text-[11px]">
                            {itemsCount} {isAr ? 'قطع' : 'items'}
                        </span>
                    </div>

                    <div className="space-y-1 text-xs max-h-32 overflow-y-auto pr-1">
                        {order.order_items && order.order_items.length > 0 ? (
                            order.order_items.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-1 border-b border-dashed border-border/60 last:border-none">
                                    <span className="font-medium text-foreground line-clamp-1">
                                        {item.product_name}
                                    </span>
                                    <div className="flex items-center gap-1.5 shrink-0 font-mono">
                                        <span className="text-muted-foreground font-bold">x{item.quantity}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic text-[11px]">
                                {isAr ? 'لا توجد أصناف مسجلة' : 'No items listed'}
                            </p>
                        )}
                        {order.order_items && order.order_items.length > 3 && (
                            <p className="text-[11px] text-primary font-bold text-center pt-1">
                                + {order.order_items.length - 3} {isAr ? 'أصناف أخرى...' : 'more items...'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Price Total */}
                <div className="flex items-center justify-between pt-2 border-t text-sm font-bold">
                    <span className="text-muted-foreground text-xs">{isAr ? 'الإجمالي:' : 'Total:'}</span>
                    <span className="text-base font-mono font-black text-primary">
                        {total.toFixed(2)}
                    </span>
                </div>
            </CardContent>

            {/* Actions Footer */}
            <CardFooter className="p-3 border-t bg-muted/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewDetails(order)}
                        className="h-8 px-2.5 text-xs font-semibold rounded-xl gap-1"
                    >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span>{isAr ? 'تفاصيل' : 'Details'}</span>
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onOpenReceipt(order)}
                        className="h-8 px-2 text-xs font-semibold rounded-xl text-muted-foreground hover:text-foreground"
                        title={isAr ? 'طباعة الفاتورة' : 'Print Receipt'}
                    >
                        <Printer className="w-3.5 h-3.5" />
                    </Button>
                </div>

                {/* Status Advancement / Quick Change */}
                <div className="flex items-center gap-1">
                    {nextStatus && (
                        <Button
                            size="sm"
                            disabled={updatingId === order.id}
                            onClick={() => onStatusChange(order.id, nextStatus)}
                            className="h-8 px-2.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
                        >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                                {isAr ? STATUS_CONFIG[nextStatus].labelAr : STATUS_CONFIG[nextStatus].labelEn}
                            </span>
                        </Button>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-xl">
                                <ChevronDown className="w-3.5 h-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl p-1">
                            {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((st) => {
                                const cfg = STATUS_CONFIG[st];
                                const StIcon = cfg.icon;
                                return (
                                    <DropdownMenuItem
                                        key={st}
                                        onClick={() => onStatusChange(order.id, st)}
                                        className="gap-2 cursor-pointer text-xs font-medium py-1.5 rounded-lg"
                                    >
                                        <StIcon className={`w-3.5 h-3.5 ${cfg.textClass}`} />
                                        <span>{isAr ? cfg.labelAr : cfg.labelEn}</span>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    );
}
