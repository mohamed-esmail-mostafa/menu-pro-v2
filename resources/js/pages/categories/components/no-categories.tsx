import { Input } from '@/components/ui/input'
import { Layers, Plus, Search, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import useImport from '@/hooks/use-import'
import { Button } from '@/components/ui/button'

export default function NoCategories({ handleOpenCreate }: any) {
    const { t } = useImport()
    return (
        <div className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl border-2 border-dashed border-border bg-card/50 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                            <Layers className="w-8 h-8" />
                        </div>
                        <div className="space-y-1 max-w-sm">
                            <h3 className="text-xl font-bold text-foreground">
                                {t('categories.no-categories')}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {t('categories.subtitle')}
                            </p>
                        </div>
                        <Button onClick={handleOpenCreate} className="rounded-xl font-semibold gap-2 cursor-pointer">
                            <Plus className="w-4 h-4" />
                            <span>{t('categories.add-category')}</span>
                        </Button>
                    </div>
    )
}
