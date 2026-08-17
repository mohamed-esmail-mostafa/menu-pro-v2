import NoDataFound from '@/components/shared/no-data-found'
import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import { Store } from '@/types/store'
import { Edit, ListFilter, Trash2 } from 'lucide-react'


export default function StoreCategories({store}:{store:Store}) {
    const {t,isAr}=useImport()
  return (
    <div>
          {store?.categories?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {store.categories.map((category: any) => (
                            <div key={category.id} className="group relative rounded-xl border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
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
                                    <h3 className="font-semibold text-base truncate">{isAr ? (category.name_ar || category.name) : (category.name_en || category.name)}</h3>
                                    <p className="text-sm text-muted-foreground mt-0.5">{category.meals_count || 0} {t('dashboard.total-meals')}</p>
                                </div>

                                <div className="flex gap-2 mt-4 pt-3 border-t">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 text-xs"
                                    >
                                        <Edit className="w-3.5 h-3.5 mr-1" />
                                        {t('common.edit')}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="text-xs"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoDataFound />
                )}
    </div>
  )
}
