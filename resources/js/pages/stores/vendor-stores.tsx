import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Plus,
    Store as StoreIcon,
    ExternalLink,
    Settings,
    MapPin,
    Search,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    LayoutDashboard,
    X,
    Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useImport from '@/hooks/use-import';
import useSelectedStore from '@/hooks/use-selected-store';
import useUserStores from '@/hooks/use-user-stores';
import { Store } from '@/types/store';
import PublicLayout from '@/layouts/public-layout';

export default function VendorStores() {
    const { t } = useImport();
    const { stores } = useUserStores() as { stores?: Store[] };
    const { selectStore,getCurrentStore } = (useSelectedStore() as any) || {};
    const [searchQuery, setSearchQuery] = useState('');

    const storesList = Array.isArray(stores) ? stores : [];
    // const store = getCurrentStore();
    const handleSelectStore = (store: Store) => {
        if (selectStore) {
            selectStore(store);
        }
        router.get(`/store/dashboard/${store.slug}`);
    };

    const filteredStores = useMemo(() => {
        if (!searchQuery.trim()) return storesList;
        const q = searchQuery.toLowerCase().trim();
        return storesList.filter(
            (s) =>
                s.name?.toLowerCase().includes(q) ||
                s.slug?.toLowerCase().includes(q) ||
                s.address?.toLowerCase().includes(q) ||
                s.description?.toLowerCase().includes(q)
        );
    }, [storesList, searchQuery]);

    return (
        <PublicLayout>
            <Head title={t('stores.title', 'My Stores')} />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Hero / Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60">
                    <div className="space-y-2">
                     
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            {t('stores.title', 'My Stores')}
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                            {t(
                                'stores.subtitle',
                                'Select a store to manage its digital menu, orders, and settings, or register a new store.'
                            )}
                        </p>
                    </div>

                    <Button
                        onClick={() => router.get('/register/store/page')}
                        size="lg"
                        className="rounded-xl font-semibold gap-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t('stores.add-new-store', 'Add New Store')}</span>
                    </Button>
                </div>

                {/* Filter and Search Bar */}
                {storesList.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80 md:w-96">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:right-3.5 rtl:left-auto" />
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('stores.search-placeholder', 'Search stores...')}
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

                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <Badge variant="secondary" className="px-3.5 py-1.5 rounded-lg text-xs font-medium gap-1.5 border border-border/50">
                                <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                                <span>{t('stores.total-stores', 'Total Stores')}:</span>
                                <span className="font-bold text-primary">{storesList.length}</span>
                            </Badge>
                        </div>
                    </div>
                )}

                {/* Content Grid */}
                {storesList.length === 0 ? (
                    /* Initial Empty State */
                    <div className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl border-2 border-dashed border-border bg-card/50 text-center space-y-5">
                        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                            <StoreIcon className="w-10 h-10" />
                        </div>
                        <div className="space-y-2 max-w-md">
                            <h2 className="text-2xl font-bold text-foreground">
                                {t('stores.no-stores-found', 'No stores found')}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t(
                                    'stores.create-first-store-desc',
                                    "You haven't registered any stores yet. Create your first digital store now to start serving customers."
                                )}
                            </p>
                        </div>
                        <Button
                            onClick={() => router.get('/register/store/page')}
                            size="lg"
                            className="rounded-xl font-semibold gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                            <span>{t('stores.create-first-store', 'Create Your First Store')}</span>
                        </Button>
                    </div>
                ) : filteredStores.length === 0 ? (
                    /* Search Filter Empty State */
                    <div className="flex flex-col items-center justify-center p-10 rounded-2xl border border-border bg-card/40 text-center space-y-4">
                        <Search className="w-10 h-10 text-muted-foreground/60" />
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-foreground">
                                {t('stores.no-stores-found', 'No stores found')}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {t('stores.no-stores-matching', 'No stores match your search query.')}
                            </p>
                        </div>
                        <Button variant="outline" onClick={() => setSearchQuery('')} className="rounded-xl text-xs cursor-pointer">
                            {t('stores.clear-search', 'Clear search')}
                        </Button>
                    </div>
                ) : (
                    <TooltipProvider>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStores.map((store: Store) => (
                                <Card
                                    key={store.id}
                                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:bg-card/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Card Banner Header */}
                                        <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20">
                                            {store.banner ? (
                                                <img
                                                    src={store.banner}
                                                    alt={store.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                                                    <StoreIcon className="w-24 h-24 text-primary/10 absolute -right-4 -bottom-4 transform -rotate-12" />
                                                </div>
                                            )}

                                            {/* Status / Verified Badges */}
                                            <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                                                {store.is_verified === 1 ? (
                                                    <Badge className="bg-emerald-500/90 text-white border-0 backdrop-blur-md gap-1 text-[10px] font-semibold px-2 py-0.5 shadow-xs">
                                                        <ShieldCheck className="w-3 h-3" />
                                                        <span>{t('stores.verified', 'Verified')}</span>
                                                    </Badge>
                                                ) : (
                                                    <div />
                                                )}

                                                <Badge
                                                    variant={store.is_active === 0 ? 'secondary' : 'default'}
                                                    className={`text-[10px] font-semibold px-2 py-0.5 backdrop-blur-md shadow-xs ${
                                                        store.is_active === 0
                                                            ? 'bg-slate-800/70 text-slate-200'
                                                            : 'bg-primary/90 text-primary-foreground'
                                                    }`}
                                                >
                                                    {store.is_active === 0
                                                        ? t('stores.inactive', 'Inactive')
                                                        : t('stores.active', 'Active')}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Logo Avatar & Quick Actions Bar */}
                                        <div className="px-6 relative flex items-end justify-between -mt-9 mb-4">
                                            <Avatar className="w-18 h-18 rounded-2xl ring-4 ring-card bg-background shadow-md overflow-hidden border border-border/80 group-hover:ring-primary/20 transition-all duration-300">
                                                <AvatarImage src={store.image || undefined} alt={store.name} className="object-cover" />
                                                <AvatarFallback className="bg-primary/10 text-primary font-extrabold text-xl rounded-2xl">
                                                    {store.name?.charAt(0).toUpperCase() || 'S'}
                                                </AvatarFallback>
                                            </Avatar>

                                            {/* Quick Links / Actions */}
                                            <div className="flex items-center gap-1.5 pb-1">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-lg border-border/60 hover:bg-accent hover:text-foreground cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(`/${store.slug}`, '_blank');
                                                            }}
                                                            aria-label={t('stores.view-live-menu', 'View Live Menu')}
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{t('stores.view-live-menu', 'View Live Menu')}</p>
                                                    </TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-lg border-border/60 hover:bg-accent hover:text-foreground cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.get(`/store/update/page/${store.slug}`);
                                                            }}
                                                            aria-label={t('stores.edit-details-store', 'Edit Store Details')}
                                                        >
                                                            <Settings className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{t('stores.edit-details-store', 'Edit Store Details')}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        {/* Store Info Content */}
                                        <div className="px-6 space-y-2">
                                            <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                {store.name}
                                            </h2>

                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                                                <span className="truncate">
                                                    {store.address || t('stores.badge-tagline', 'Digital Store')}
                                                </span>
                                            </div>

                                            {store.description && (
                                                <p className="text-xs text-muted-foreground/90 line-clamp-2 pt-1 leading-relaxed">
                                                    {store.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer / Primary CTA */}
                                    <CardFooter className="px-6 pt-4 pb-6 mt-4 border-t border-border/50">
                                        <Button
                                            onClick={() => handleSelectStore(store)}
                                            className="w-full gap-2 rounded-xl font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-xs cursor-pointer"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            <span>{t('stores.enter-dashboard', 'Enter Dashboard')}</span>
                                            <ArrowRight className="w-4 h-4 ml-auto rtl:mr-auto rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}

                            {/* Add New Store CTA Card */}
                            <button
                                onClick={() => router.get('/register/store/page')}
                                className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary bg-primary/[0.02] hover:bg-primary/[0.06] transition-all duration-300 min-h-[320px] text-center cursor-pointer shadow-xs hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-xs mb-4">
                                    <Plus className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                    {t('stores.add-new-store', 'Add New Store')}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
                                    {t(
                                        'stores.create-first-store-desc',
                                        'Register another restaurant or business to start generating QR digital menus.'
                                    )}
                                </p>
                                <span className="mt-5 text-xs font-semibold text-primary inline-flex items-center gap-1.5 group-hover:underline">
                                    <span>{t('stores.add-new-store', 'Add New Store')}</span>
                                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </TooltipProvider>
                )}
            </div>
        </PublicLayout>
    );
}
