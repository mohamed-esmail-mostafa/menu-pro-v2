import React, { useState, useMemo } from 'react';
import { Store } from '@/types/store';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { StoreHeader } from './components/store-header';
import { CategoryTabs } from './components/CategoryTabs';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartSheet } from './components/CartSheet';
import { WishlistSheet } from './components/WishlistSheet';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useImport from '@/hooks/use-import';

export default function StoreMenuPage({ store, tableId }: { store: Store, tableId: number }) {
    const { isAr } = useImport();
    const {
        cartItems,
        totalCount: cartTotalCount,
        totalPrice: cartTotalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
    } = useCart(store.id);

    const {
        wishlistItems,
        totalCount: wishlistTotalCount,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
    } = useWishlist(store.id);

    // UI States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

    // Resolve Currency
    const currency = useMemo(() => {
        if (!store.country) return isAr ? 'ج.م' : 'E£';
        return isAr
            ? store.country.currency_ar || store.country.currency_en || 'ج.م'
            : store.country.currency_en || store.country.currency_ar || 'E£';
    }, [store.country, isAr]);

    const categories = store.categories || [];
    const products = store.products || [];

    // Helper to check if product belongs to category
    const isProductInCategory = (product: Product, cat: (typeof categories)[0]) => {
        const catPivotId = cat.pivot?.id;
        if (catPivotId !== undefined && catPivotId !== null) {
            if (product.store_category_id === catPivotId) return true;
        }
        return product.store_category_id === cat.id;
    };

    // Calculate Category Product Counts
    const categoryCounts = useMemo(() => {
        const counts: Record<number | string, number> = {};
        categories.forEach((cat) => {
            const catId = cat.pivot?.id ?? cat.id;
            const count = products.filter((p) => isProductInCategory(p, cat)).length;
            counts[catId] = count;
        });
        return counts;
    }, [categories, products]);

    // Filter Products by Search Query and Selected Category
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Search filter
            const matchesSearch =
                !searchQuery ||
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description &&
                    product.description.toLowerCase().includes(searchQuery.toLowerCase()));

            if (!matchesSearch) return false;

            // Category filter
            if (selectedCategory === 'all') return true;

            const targetCat = categories.find(
                (c) => (c.pivot?.id ?? c.id) === selectedCategory
            );
            if (!targetCat) return true;

            return isProductInCategory(product, targetCat);
        });
    }, [products, searchQuery, selectedCategory, categories]);

    // Group Products by Category for Display
    const groupedCategories = useMemo(() => {
        if (selectedCategory !== 'all') {
            const currentCat = categories.find(
                (c) => (c.pivot?.id ?? c.id) === selectedCategory
            );
            if (!currentCat) return [];
            return [
                {
                    category: currentCat,
                    products: filteredProducts,
                },
            ];
        }

        // For 'all', group filtered products by their categories without duplication
        const assignedProductIds = new Set<number>();
        const groups: { category: (typeof categories)[0]; products: Product[] }[] = [];

        categories.forEach((cat) => {
            const catProducts = filteredProducts.filter(
                (p) => !assignedProductIds.has(p.id) && isProductInCategory(p, cat)
            );
            if (catProducts.length > 0) {
                catProducts.forEach((p) => assignedProductIds.add(p.id));
                groups.push({
                    category: cat,
                    products: catProducts,
                });
            }
        });

        // Uncategorized products
        const uncategorized = filteredProducts.filter((p) => !assignedProductIds.has(p.id));
        if (uncategorized.length > 0) {
            groups.push({
                category: {
                    id: 0,
                    name: isAr ? 'أطباق أخرى' : 'Other Dishes',
                    slug: 'other',
                    description: '',
                    image: null,
                },
                products: uncategorized,
            });
        }

        return groups;
    }, [filteredProducts, selectedCategory, categories, isAr]);

    return (
        <div className="min-h-screen bg-muted/15 text-foreground font-sans pb-24 sm:pb-12">
            {/* Header */}
            <StoreHeader
                store={store}
                cartCount={cartTotalCount}
                wishlistCount={wishlistTotalCount}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenWishlist={() => setIsWishlistOpen(true)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Category Sticky Tabs */}
            {categories.length > 0 && (
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    totalProducts={products.length}
                    categoryCounts={categoryCounts}
                />
            )}

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                {filteredProducts.length === 0 ? (
                    /* Empty Search State */
                    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-2xl border border-border shadow-xs my-8 space-y-3">
                        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <SearchX className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">
                            {isAr ? 'لم يتم العثور على أطباق' : 'No items found'}
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-sm">
                            {isAr
                                ? 'جرب البحث بكلمات مختلفة أو اختر قسماً آخر من الأقسام أعلاه.'
                                : 'Try searching for something else or switch to another category.'}
                        </p>
                        {searchQuery && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSearchQuery('')}
                                className="mt-2 rounded-full text-xs"
                            >
                                {isAr ? 'إلغاء البحث' : 'Clear search'}
                            </Button>
                        )}
                    </div>
                ) : (
                    /* Product Groups */
                    groupedCategories.map((group) => {
                        const catId = group.category.pivot?.id ?? group.category.id;
                        const catName = group.category.pivot?.name || group.category.name;

                        return (
                            <section key={catId} className="space-y-4">
                                {/* Category Header */}
                                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-6 bg-primary rounded-full" />
                                        <h2 className="text-lg font-bold text-foreground tracking-tight">
                                            {catName}
                                        </h2>
                                        <span className="text-xs text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-full">
                                            {group.products.length}
                                        </span>
                                    </div>
                                </div>

                                {/* Products Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {group.products.map((product) => {
                                        const qty = getItemQuantity(product.id);
                                        const inWish = isInWishlist(product.id);

                                        return (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                currency={currency}
                                                quantityInCart={qty}
                                                isInWishlist={inWish}
                                                onAddToCart={(prod) => addToCart(prod)}
                                                onUpdateQuantity={(prodId, newQty) =>
                                                    updateQuantity(prodId, newQty)
                                                }
                                                onToggleWishlist={(prod) => toggleWishlist(prod)}
                                                onOpenDetails={(prod) =>
                                                    setSelectedProductModal(prod)
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })
                )}
            </main>

            {/* Mobile Bottom Sticky Cart Bar */}
            {cartTotalCount > 0 && (
                <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full bg-primary text-primary-foreground p-3.5 rounded-full shadow-xl flex items-center justify-between font-bold text-sm transition-transform active:scale-98"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="bg-primary-foreground text-primary h-7 w-7 rounded-full flex items-center justify-center text-xs font-black">
                                {cartTotalCount}
                            </div>
                            <span>{isAr ? 'عرض سلة الطلبات' : 'View Order'}</span>
                        </div>
                        <div className="font-mono text-sm">
                            {cartTotalPrice.toFixed(2)} {currency}
                        </div>
                    </button>
                </div>
            )}

            {/* Product Detail Dialog */}
            <ProductDetailModal
                product={selectedProductModal}
                currency={currency}
                isOpen={!!selectedProductModal}
                onClose={() => setSelectedProductModal(null)}
                isInWishlist={selectedProductModal ? isInWishlist(selectedProductModal.id) : false}
                quantityInCart={
                    selectedProductModal ? getItemQuantity(selectedProductModal.id) : 0
                }
                onAddToCart={(prod, qty) => addToCart(prod, store.id, qty)}
                onToggleWishlist={(prod) => toggleWishlist(prod)}
            />

            {/* Cart Sheet Drawer */}
            <CartSheet
                tableId={tableId}
                store={store}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                currency={currency}
                totalPrice={cartTotalPrice}
                totalCount={cartTotalCount}
                onUpdateQuantity={(prodId, qty) => updateQuantity(prodId, qty)}
                onRemoveItem={(prodId) => removeFromCart(prodId)}
                onClearCart={() => clearCart()}
            />

            {/* Wishlist Sheet Drawer */}
            <WishlistSheet
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
                items={wishlistItems}
                currency={currency}
                onRemoveItem={(prodId) => removeFromWishlist(prodId)}
                onClearWishlist={() => clearWishlist()}
                onAddToCart={(prod) => addToCart(prod)}
            />
        </div>
    );
}
