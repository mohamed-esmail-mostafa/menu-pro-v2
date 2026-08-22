import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import { SearchX } from 'lucide-react'
import React from 'react'

export default function NoProducts({ searchQuery, setSearchQuery }: any) {

    const { t, isAr } = useImport()
    return (
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
    )
}
