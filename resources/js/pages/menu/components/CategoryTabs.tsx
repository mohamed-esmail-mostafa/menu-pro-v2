import React, { useEffect } from 'react';
import { Category } from '@/types/category';
import { useTranslation } from 'react-i18next';
import { Utensils } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface CategoryTabsProps {
    categories: Category[];
    selectedCategory: number | 'all';
    onSelectCategory: (id: number | 'all') => void;
    totalProducts: number;
    categoryCounts: Record<number | string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
    totalProducts,
    categoryCounts,
}) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        direction: isAr ? 'rtl' : 'ltr',
    });

    // Auto-scroll selected category into view
    useEffect(() => {
        if (!emblaApi) return;
        const index =
            selectedCategory === 'all'
                ? 0
                : categories.findIndex((c) => (c.pivot?.id ?? c.id) === selectedCategory) + 1;
        if (index >= 0) {
            emblaApi.scrollTo(index);
        }
    }, [emblaApi, selectedCategory, categories]);

    return (
        <div className="sticky top-[105px] z-20 bg-background/90 backdrop-blur-md border-b border-border shadow-2xs py-2.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex items-center gap-2 py-1 select-none">
                        {/* All Categories Pill */}
                        <button
                            onClick={() => onSelectCategory('all')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                                selectedCategory === 'all'
                                    ? 'bg-primary text-primary-foreground border-primary shadow-xs scale-102'
                                    : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            <Utensils className="w-3.5 h-3.5" />
                            <span>{isAr ? 'جميع الأقسام' : 'All Categories'}</span>
                            <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                    selectedCategory === 'all'
                                        ? 'bg-primary-foreground/20 text-primary-foreground'
                                        : 'bg-muted-foreground/15 text-muted-foreground'
                                }`}
                            >
                                {totalProducts}
                            </span>
                        </button>

                        {/* Category List */}
                        {categories.map((cat) => {
                            const catId = cat.pivot?.id ?? cat.id;
                            const isSelected = selectedCategory === catId;
                            const name = cat.pivot?.name || cat.name;
                            const count = categoryCounts[catId] || 0;

                            return (
                                <button
                                    key={catId}
                                    onClick={() => onSelectCategory(catId)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                                        isSelected
                                            ? 'bg-primary text-primary-foreground border-primary shadow-xs scale-102'
                                            : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    {cat.image && (
                                        <img
                                            src={cat.image}
                                            alt={name}
                                            className="w-4 h-4 rounded-full object-cover"
                                        />
                                    )}
                                    <span>{name}</span>
                                    {count > 0 && (
                                        <span
                                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                                isSelected
                                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                                    : 'bg-muted-foreground/15 text-muted-foreground'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
