import React from 'react';
import { Store } from '@/types/store';
import { ShoppingBag, Heart, MapPin, Phone, CheckCircle2, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import useImport from '@/hooks/use-import';
import ThemeToggle from '@/components/shared/theme-toggle';
import LangToggle from '@/components/shared/lang-toggle';

interface StoreHeaderProps {
    store: Store;
    cartCount: number;
    wishlistCount: number;
    onOpenCart: () => void;
    onOpenWishlist: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
    store,
    cartCount,
    wishlistCount,
    onOpenCart,
    onOpenWishlist,
    searchQuery,
    setSearchQuery,
}) => {
    const { t, i18n,isAr } = useImport();


    const isOpen = store.store_status ? store.store_status.toLowerCase() === 'open' : true;

    return (
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-xs">
            {/* Top Bar */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center'>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        {store.address && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span>{store.address}</span>
                            </div>
                        )}
                        {store.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                                <a href={`tel:${store.phone}`} className="hover:underline font-mono">
                                    {store.phone}
                                </a>
                            </div>
                        )}
                    </div>


                  <div>
                       <ThemeToggle />
                        <LangToggle />

                  </div>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Store Branding */}
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-bold text-primary text-xl shadow-xs">
                            {store.image ? (
                                <img
                                    src={store.image}
                                    alt={store.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                store.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold text-foreground tracking-tight">
                                    {store.name}
                                </h1>
                                {store.is_verified ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : null}
                                <Badge
                                    variant={isOpen ? 'default' : 'destructive'}
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        isOpen
                                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                                    }`}
                                >
                                    {isOpen
                                        ? isAr
                                            ? 'مفتوح الان'
                                            : 'Open'
                                        : isAr
                                        ? 'مغلق'
                                        : 'Closed'}
                                </Badge>
                            </div>
                            {store.description && (
                                <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs sm:max-w-md">
                                    {store.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions: Lang, Wishlist, Cart */}
                    <div className="flex items-center gap-2">
                      
                        {/* <ThemeToggle />
                        <LangToggle /> */}

                        {/* Wishlist Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onOpenWishlist}
                            className="relative h-9 w-9 p-0 rounded-full border-border hover:bg-accent hover:text-rose-500 transition-colors"
                            title={isAr ? 'المفضلة' : 'Wishlist'}
                        >
                            <Heart className="w-4 h-4" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-in zoom-in-50">
                                    {wishlistCount}
                                </span>
                            )}
                        </Button>

                        {/* Cart Button */}
                        <Button
                            variant="default"
                            size="sm"
                            onClick={onOpenCart}
                            className="relative h-9 px-3.5 rounded-full gap-2 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs transition-transform active:scale-95"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span className="hidden sm:inline">{isAr ? 'السلة' : 'Cart'}</span>
                            {cartCount > 0 && (
                                <span className="bg-primary-foreground text-primary text-xs font-black rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Sub Bar: Contact Info & Search */}
                <div className="mt-3 pt-3 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-8 text-xs pl-8 rtl:pl-3 rtl:pr-8 rounded-full bg-muted/50 border-border/80 focus:bg-background transition-colors"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
