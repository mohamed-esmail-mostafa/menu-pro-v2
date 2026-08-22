import { Category } from '@/types/category';
import { Utensils } from 'lucide-react';
import React from 'react'

export default function CategoryChip({ cat, selectedCategory, onSelectCategory }: { cat: Category, selectedCategory: any, onSelectCategory: any }) {

    const catId = cat.pivot?.id ?? cat.id;
    const isSelected = selectedCategory === catId;
    const name = cat.pivot?.name || cat.name;

    return (
        <button
            key={cat.pivot?.id ?? cat.id}
            onClick={() => onSelectCategory(catId)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${isSelected
                ? 'bg-primary text-primary-foreground border-primary shadow-xs scale-102'
                : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                }`}
        >
            {cat.image ? (
                <img
                    src={cat.image}
                    alt={name}
                    className="w-5 h-5 rounded-full object-cover"
                />
            ):(<><Utensils className="w-5 h-5" /></>)}
            <span>{name}</span>

        </button>
    )
}
