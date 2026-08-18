import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order, OrderStatus } from '@/types/order';
import useImport from '@/hooks/use-import';
import { STATUS_CONFIG } from './order-details-dialog';
import { Eye, Printer, ChevronDown, Clock, User, Phone } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrdersTableProps {
    orders: Order[];
    onViewDetails: (order: Order) => void;
    onOpenReceipt: (order: Order) => void;
    onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
    updatingId: number | null;
}

export default function OrdersTable({
    orders,
    onViewDetails,
    onOpenReceipt,
    onStatusChange,
    updatingId,
}: OrdersTableProps) {
    const { isAr } = useImport();

    return (
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                    <thead className="bg-muted/50 border-b text-muted-foreground font-bold">
                        <tr>
                            <th className="p-3.5 text-start">{isAr ? 'رقم الطلب' : 'Order #'}</th>
                            <th className="p-3.5 text-start">{isAr ? 'العميل / الطاولة' : 'Customer / Table'}</th>
                            <th className="p-3.5 text-center">{isAr ? 'الأصناف' : 'Items'}</th>
                            <th className="p-3.5 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                            <th className="p-3.5 text-center">{isAr ? 'طريقة الدفع' : 'Payment'}</th>
                            <th className="p-3.5 text-end">{isAr ? 'الإجمالي' : 'Total'}</th>
                            <th className="p-3.5 text-end">{isAr ? 'التاريخ' : 'Date'}</th>
                            <th className="p-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                        {orders.map((order) => {
                            const config = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
                            const StatusIcon = config.icon;

                            const formattedDate = new Date(order.created_at).toLocaleString(
                                isAr ? 'ar-EG' : 'en-US',
                                { dateStyle: 'short', timeStyle: 'short' }
                            );

                            const total = parseFloat(order.total?.toString() || '0');
                            const itemsCount =
                                order.order_items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

                            return (
                                <tr
                                    key={order.id}
                                    className="hover:bg-muted/30 transition-colors"
                                >
                                    {/* Order Number */}
                                    <td className="p-3.5 font-mono font-bold text-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm text-primary">#{order.order_number}</span>
                                        </div>
                                    </td>

                                    {/* Customer / Table */}
                                    <td className="p-3.5 font-medium text-foreground">
                                        {order.table_no ? (
                                            <Badge variant="secondary" className="font-mono text-xs">
                                                {isAr ? `طاولة #${order.table_no}` : `Table #${order.table_no}`}
                                            </Badge>
                                        ) : order.name ? (
                                            <div>
                                                <div className="font-semibold">{order.name}</div>
                                                {order.phone && (
                                                    <div className="text-[11px] text-muted-foreground" dir="ltr">
                                                        {order.phone}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground italic">
                                                {isAr ? 'طلب أونلاين' : 'Direct Order'}
                                            </span>
                                        )}
                                    </td>

                                    {/* Items count */}
                                    <td className="p-3.5 text-center">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold font-mono text-[11px]">
                                            {itemsCount} {isAr ? 'قطع' : 'items'}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="p-3.5 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    disabled={updatingId === order.id}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${config.bgClass} ${config.textClass} ${config.borderClass} hover:opacity-80`}
                                                >
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    <span>{isAr ? config.labelAr : config.labelEn}</span>
                                                    <ChevronDown className="w-3 h-3 opacity-60" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="w-44 rounded-xl p-1">
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
                                    </td>

                                    {/* Payment Method */}
                                    <td className="p-3.5 text-center">
                                        <Badge variant="outline" className="capitalize text-[11px] font-mono">
                                            {order.payment_method}
                                        </Badge>
                                    </td>

                                    {/* Total */}
                                    <td className="p-3.5 text-end font-mono font-bold text-sm text-primary">
                                        {total.toFixed(2)}
                                    </td>

                                    {/* Date */}
                                    <td className="p-3.5 text-end text-muted-foreground text-[11px]">
                                        {formattedDate}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-3.5 text-end">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onViewDetails(order)}
                                                className="h-8 px-2.5 text-xs font-semibold rounded-xl gap-1"
                                            >
                                                <Eye className="w-3.5 h-3.5 text-primary" />
                                                <span>{isAr ? 'عرض' : 'View'}</span>
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onOpenReceipt(order)}
                                                className="h-8 w-8 p-0 rounded-xl text-muted-foreground hover:text-foreground"
                                                title={isAr ? 'طباعة الفاتورة' : 'Print Receipt'}
                                            >
                                                <Printer className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
