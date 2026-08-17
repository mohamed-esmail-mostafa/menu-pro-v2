import React, { useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ListFilter, Loader2, Plus, Search, X } from 'lucide-react'
import useImport from '@/hooks/use-import'
import { Badge } from '@/components/ui/badge'
import { Category } from '@/types/category'
import { Input } from '@/components/ui/input'

export default function CategoriesSheet({ unassignedCategories, searchQuery, setSearchQuery, filteredUnassignedCategories, assigningId, handleAssignCategory }: any) {
    const [isOpenSheet, setOpenSheet] = useState(false)
    const { t, isAr } = useImport();

    return (
        <Sheet open={isOpenSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    {t("store_dashboard.categories.choose-category")}
                </Button>
            </SheetTrigger>

            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 flex flex-col bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl">
                <SheetHeader className="p-6 pb-4 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                {/* <Sparkles className="w-6 h-6" /> */}
                            </div>
                            <div>
                                <SheetTitle className="text-xl font-bold flex items-center gap-2">
                                    {t("store_dashboard.categories.choose-category")}
                                    <Badge variant="secondary" className="font-mono text-xs px-2">
                                        {unassignedCategories.length}
                                    </Badge>
                                </SheetTitle>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {t("store_dashboard.categories.choose-category")}
                                </p>
                            </div>
                        </div>

                        {/* Search input in sheet */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e: any) => setSearchQuery(e.target.value)}
                                placeholder={t("store_dashboard.categories.search-categories") || (isAr ? 'ابحث عن قسم...' : 'Search categories...')}
                                className="pl-9 pr-8 py-2 text-sm bg-background/80 border-input focus:ring-2 focus:ring-primary/20 transition-all rounded-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </SheetHeader>

                {/* Unassigned Categories List in Sheet */}
                <div className="flex-1 overflow-y-auto p-6">
                    {filteredUnassignedCategories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredUnassignedCategories.map((category: Category) => {
                                const isAssigning = assigningId === category.id
                                // const categoryName = isAr
                                //     ? (category.name_ar || category.name)
                                //     : (category.name_en || category.name)

                                return (
                                    <div
                                        key={category.id}
                                        className="group relative rounded-xl border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="aspect-video rounded-lg bg-muted mb-3 overflow-hidden border">
                                                {category.image ? (
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                        <ListFilter className="w-8 h-8 opacity-20" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="font-semibold text-base truncate">{category.name}</h3>
                                        </div>

                                        <div className="mt-4 pt-3 border-t">
                                            <Button
                                                onClick={() => handleAssignCategory(category.id)}
                                                disabled={isAssigning}
                                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-9 gap-2 shadow-2xs font-medium"
                                            >
                                                {isAssigning ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Plus className="w-4 h-4" />
                                                )}
                                                {t("store_dashboard.categories.add-category")}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <ListFilter className="w-8 h-8 text-muted-foreground opacity-40" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">
                                {t("categories.no-unassigned-categories")}
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                {searchQuery
                                    ? (isAr ? 'لم يتم العثور على أقسام تطابق البحث' : 'No categories match your search')
                                    : (isAr ? 'لقد قمت بإضافة كافة الأقسام المتاحة في النظام إلى متجرك' : 'You have assigned all available system categories to your store')}
                            </p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
