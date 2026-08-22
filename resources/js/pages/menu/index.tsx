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
import { Category } from '@/types/category';
import NoProducts from './components/no-products';
import useCurrencyStore from '@/hooks/use-currency-store';
import ProductDetailsSheet from './components/product-details-sheet';


interface StoreMenuPageProps {
    store: Store,
    tableId: number,
    products: Product[],
    categories: Category[]
}

export default function StoreMenuPage({ store, tableId, products, categories }: StoreMenuPageProps) {
    const { t, isAr } = useImport();
    const { cartItems, totalCount: cartTotalCount, totalPrice: cartTotalPrice, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity } = useCart(store.id);

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { currency } = useCurrencyStore({ store })
    const [selected_options, setSelectedOptions] = useState({})

    const filtered_products = selectedCategory === "all" ? products : products.filter((product) => product.store_category_id === selectedCategory)



    const handleChangeOption = (attributeId: number, valueId: number) => {
        setSelectedOptions(prev => ({
            ...prev,
            [attributeId]: valueId
        }))
    }

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


            {categories.length > 0 && (
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    totalProducts={products.length}

                />
            )}

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8 py-6 space-y-8">
                {filtered_products.length === 0 ? (

                    <NoProducts searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2'>
                        {filtered_products.map((product: Product) => {
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
                                    onUpdateQuantity={(prodId, newQty) => updateQuantity(prodId, newQty)}
                                    onToggleWishlist={(prod) => toggleWishlist(prod)}
                                    handleChangeOption={handleChangeOption}
                                    onOpenDetails={(prod) =>
                                        setSelectedProductModal(prod)
                                        // setSelectedProduct(prod)
                                    }
                                />
                            )
                        })}

                    </div>

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
                            <span>{t("common.view-cart")}</span>
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
                handleChangeOption={handleChangeOption}
                selected_options={selected_options}
            />
            {/* <ProductDetailsSheet
            
            
            
            
            /> */}

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
