import React, { useState, useMemo } from 'react';
import StoreDashboardLayout from '@/layouts/store-dashboard-layout';
import { Store } from '@/types/store';
import { Order, OrderStatus } from '@/types/order';
import useImport from '@/hooks/use-import';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import OrderCard from './components/order-card';
import OrdersTable from './components/orders-table';
import OrderDetailsDialog from './components/order-details-dialog';
import OrderReceiptDialog from './components/order-receipt-dialog';
import {
    ShoppingBag,
    Clock,
    Flame,
    CheckCircle2,
    Search,
    LayoutGrid,
    List,
    DollarSign,
    RefreshCw,
    SlidersHorizontal,
    Utensils,
    XCircle,
    BellRing,
    Sparkles,
} from 'lucide-react';

interface OrdersPageProps {
    store?: Store;
    orders?: Store;
}

export default function OrdersPage({ store, orders }: OrdersPageProps) {
    const { isAr } = useImport();

    // Store object can be passed as `store` or `orders`
    const currentStore = store || orders;
    const ordersList: Order[] = useMemo(() => currentStore?.orders || [], [currentStore]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);
    const [selectedOrderForReceipt, setSelectedOrderForReceipt] = useState<Order | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    // Dynamic Statistics
    const stats = useMemo(() => {
        const totalCount = ordersList.length;
        const pendingCount = ordersList.filter((o) => o.order_status === 'pending').length;
        const preparingCount = ordersList.filter((o) => o.order_status === 'preparing' || o.order_status === 'confirmed').length;
        const readyCount = ordersList.filter((o) => o.order_status === 'ready' || o.order_status === 'out_for_delivery').length;
        const deliveredCount = ordersList.filter((o) => o.order_status === 'delivered').length;

        const totalRevenue = ordersList.reduce((acc, o) => {
            if (o.order_status !== 'cancelled') {
                return acc + parseFloat(o.total?.toString() || '0');
            }
            return acc;
        }, 0);

        return {
            totalCount,
            pendingCount,
            preparingCount,
            readyCount,
            deliveredCount,
            totalRevenue,
        };
    }, [ordersList]);

    // Filtered orders list
    const filteredOrders = useMemo(() => {
        return ordersList.filter((order) => {
            // Status match
            if (selectedStatusTab !== 'all') {
                if (selectedStatusTab === 'preparing') {
                    if (order.order_status !== 'preparing' && order.order_status !== 'confirmed') return false;
                } else if (selectedStatusTab === 'ready') {
                    if (order.order_status !== 'ready' && order.order_status !== 'out_for_delivery') return false;
                } else if (order.order_status !== selectedStatusTab) {
                    return false;
                }
            }

            // Search query match
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase().trim();
                const numMatch = order.order_number?.toLowerCase().includes(q);
                const nameMatch = order.name?.toLowerCase().includes(q);
                const phoneMatch = order.phone?.toLowerCase().includes(q);
                const tableMatch = order.table_no?.toString().includes(q);
                const itemMatch = order.order_items?.some((i) => i.product_name?.toLowerCase().includes(q));

                return numMatch || nameMatch || phoneMatch || tableMatch || itemMatch;
            }

            return true;
        });
    }, [ordersList, selectedStatusTab, searchQuery]);

    // Handle Order Status update
    const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
        setUpdatingId(orderId);
        router.patch(
            `/orders/${orderId}/status`,
            { status: newStatus },
            {
                onSuccess: () => {
                    toast.success(
                        isAr ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully'
                    );
                    // Update current open details dialog if active
                    if (selectedOrderForDetails && selectedOrderForDetails.id === orderId) {
                        setSelectedOrderForDetails({
                            ...selectedOrderForDetails,
                            order_status: newStatus,
                        });
                    }
                },
                onError: () => {
                    toast.error(isAr ? 'فشل في تحديث حالة الطلب' : 'Failed to update order status');
                },
                onFinish: () => {
                    setUpdatingId(null);
                },
            }
        );
    };

    const statusTabs = [
        { id: 'all', labelAr: 'الكل', labelEn: 'All', count: stats.totalCount, icon: SlidersHorizontal },
        { id: 'pending', labelAr: 'قيد الانتظار', labelEn: 'Pending', count: stats.pendingCount, icon: Clock, badgeColor: 'bg-amber-500/10 text-amber-600' },
        { id: 'preparing', labelAr: 'جاري التحضير', labelEn: 'Preparing', count: stats.preparingCount, icon: Flame, badgeColor: 'bg-indigo-500/10 text-indigo-600' },
        { id: 'ready', labelAr: 'جاهز', labelEn: 'Ready', count: stats.readyCount, icon: BellRing, badgeColor: 'bg-teal-500/10 text-teal-600' },
        { id: 'delivered', labelAr: 'مكتمل', labelEn: 'Delivered', count: stats.deliveredCount, icon: CheckCircle2, badgeColor: 'bg-emerald-500/10 text-emerald-600' },
        { id: 'cancelled', labelAr: 'ملغي', labelEn: 'Cancelled', count: ordersList.filter((o) => o.order_status === 'cancelled').length, icon: XCircle, badgeColor: 'bg-rose-500/10 text-rose-600' },
    ];

    return (
        <StoreDashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-2xl bg-primary/10 text-primary">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                                    <span>{isAr ? 'إدارة الطلبات' : 'Orders Management'}</span>
                                    <Badge variant="outline" className="font-mono text-xs">
                                        {ordersList.length}
                                    </Badge>
                                </h1>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {isAr
                                        ? 'متابعة وإدارة طلبات المطعم وطاولات الزبائن وتحديث الحالات مباشرة.'
                                        : 'Monitor, manage restaurant orders, tables, and track status live.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reload Button */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.reload()}
                            className="gap-2 text-xs font-semibold rounded-xl"
                        >
                            <RefreshCw className="w-4 h-4 text-primary" />
                            <span>{isAr ? 'تحديث البيانات' : 'Refresh'}</span>
                        </Button>
                    </div>
                </div>

                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Orders Card */}
                    <div className="p-4 rounded-2xl border bg-card/80 shadow-2xs flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-semibold">
                                {isAr ? 'إجمالي الطلبات' : 'Total Orders'}
                            </span>
                            <div className="text-2xl font-black font-mono text-foreground">
                                {stats.totalCount}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Pending Orders Card */}
                    <div className="p-4 rounded-2xl border bg-card/80 shadow-2xs flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-semibold">
                                {isAr ? 'قيد الانتظار' : 'Pending Orders'}
                            </span>
                            <div className="text-2xl font-black font-mono text-amber-600">
                                {stats.pendingCount}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>

                    {/* In Preparation Card */}
                    <div className="p-4 rounded-2xl border bg-card/80 shadow-2xs flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-semibold">
                                {isAr ? 'جاري التحضير' : 'In Preparation'}
                            </span>
                            <div className="text-2xl font-black font-mono text-indigo-600">
                                {stats.preparingCount}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                            <Flame className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Total Sales Card */}
                    <div className="p-4 rounded-2xl border bg-card/80 shadow-2xs flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-semibold">
                                {isAr ? 'مجموع المبيعات' : 'Total Sales'}
                            </span>
                            <div className="text-2xl font-black font-mono text-emerald-600">
                                {stats.totalRevenue.toFixed(2)}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Filters & Search Control Header */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card p-3 rounded-2xl border shadow-2xs">
                    {/* Status Tabs Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                        {statusTabs.map((tb) => {
                            const TabIcon = tb.icon;
                            const isActive = selectedStatusTab === tb.id;
                            return (
                                <button
                                    key={tb.id}
                                    onClick={() => setSelectedStatusTab(tb.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                                        isActive
                                            ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                                            : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted'
                                    }`}
                                >
                                    <TabIcon className="w-3.5 h-3.5" />
                                    <span>{isAr ? tb.labelAr : tb.labelEn}</span>
                                    <span
                                        className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] font-bold ${
                                            isActive
                                                ? 'bg-primary-foreground/20 text-primary-foreground'
                                                : tb.badgeColor || 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {tb.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side: Search bar & Layout toggle */}
                    <div className="flex items-center gap-2">
                        {/* Search Input */}
                        <div className="relative flex-1 md:w-64">
                            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isAr ? 'بحث رقم الطلب أو اسم العميل...' : 'Search order # or customer...'}
                                className="h-9 text-xs pl-9 rtl:pl-3 rtl:pr-9 rounded-xl"
                            />
                        </div>

                        {/* View Switcher Toggle */}
                        <div className="flex items-center border p-0.5 rounded-xl bg-muted/40 shrink-0">
                            <Button
                                size="sm"
                                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                onClick={() => setViewMode('grid')}
                                className="h-8 w-8 p-0 rounded-lg"
                                title={isAr ? 'عرض الكروت' : 'Grid View'}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                                onClick={() => setViewMode('table')}
                                className="h-8 w-8 p-0 rounded-lg"
                                title={isAr ? 'عرض الجدول' : 'Table View'}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Orders Content Area */}
                {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl border border-dashed bg-card/50 flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
                            <Utensils className="w-8 h-8 opacity-50" />
                        </div>
                        <h3 className="text-base font-bold text-foreground">
                            {isAr ? 'لا توجد طلبات مطابقة' : 'No orders found'}
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                            {searchQuery
                                ? isAr
                                    ? 'لم نجد أي طلب يطابق نص البحث، جرب البحث برقم آخر.'
                                    : 'No orders match your search terms.'
                                : isAr
                                ? 'لا توجد طلبات في هذه الحالة حالياً.'
                                : 'There are currently no orders in this category.'}
                        </p>
                        {searchQuery && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSearchQuery('')}
                                className="rounded-xl text-xs"
                            >
                                {isAr ? 'مسح البحث' : 'Clear Search'}
                            </Button>
                        )}
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onViewDetails={(ord) => setSelectedOrderForDetails(ord)}
                                onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
                                onStatusChange={handleStatusChange}
                                updatingId={updatingId}
                            />
                        ))}
                    </div>
                ) : (
                    <OrdersTable
                        orders={filteredOrders}
                        onViewDetails={(ord) => setSelectedOrderForDetails(ord)}
                        onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
                        onStatusChange={handleStatusChange}
                        updatingId={updatingId}
                    />
                )}
            </div>

            {/* Order Details Modal */}
            <OrderDetailsDialog
                order={selectedOrderForDetails}
                store={currentStore || null}
                open={!!selectedOrderForDetails}
                onClose={() => setSelectedOrderForDetails(null)}
                onStatusChange={handleStatusChange}
                onOpenReceipt={(ord) => {
                    setSelectedOrderForDetails(null);
                    setSelectedOrderForReceipt(ord);
                }}
                updatingId={updatingId}
            />

            {/* Order Receipt Thermal Print Modal */}
            <OrderReceiptDialog
                order={selectedOrderForReceipt}
                store={currentStore || null}
                open={!!selectedOrderForReceipt}
                onClose={() => setSelectedOrderForReceipt(null)}
            />
        </StoreDashboardLayout>
    );
}
