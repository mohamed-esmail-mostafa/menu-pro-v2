import { Card } from '@/components/ui/card'
import { Category } from '@/types/category'
import { Edit, ImageIcon, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'

export default function AdminCategoryCard({ category,handleOpenEdit,handleOpenDelete }: { category: Category,handleOpenEdit:any, handleOpenDelete:any}) {
    const { t } = useImport()

    return (
        <Card
            key={category.id}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card hover:bg-card/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
            <div>
                {/* Thumbnail Image */}
                <div className="relative h-36 w-full overflow-hidden bg-muted/40">
                    {category.image ? (
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50 bg-gradient-to-br from-muted/30 to-muted/80">
                            <ImageIcon className="w-10 h-10 mb-1 opacity-40" />
                            <span className="text-[11px] font-medium opacity-60">No Image</span>
                        </div>
                    )}

                    {category.position !== null && category.position !== undefined && (
                        <Badge variant="secondary" className="absolute top-2 right-2 text-[10px] font-mono backdrop-blur-md bg-background/80 shadow-xs">
                            #{category.position}
                        </Badge>
                    )}
                </div>

                {/* Info Content */}
                <div className="p-4 space-y-1.5">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {category.name}
                    </h3>
                    {category.description ? (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {category.description}
                        </p>
                    ) : (
                        <p className="text-[11px] font-mono text-muted-foreground/70 truncate">
                            /{category.slug}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 pt-2 border-t border-border/40 flex items-center justify-end gap-2 bg-muted/10">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(category)}
                    className="h-8 rounded-lg text-xs gap-1.5 hover:bg-primary/10 hover:text-primary border-border/60 cursor-pointer"
                >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{t('common.edit', 'Edit')}</span>
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleOpenDelete(category)}
                    className="h-8 rounded-lg text-xs gap-1.5 cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('common.delete', 'Delete')}</span>
                </Button>
            </div>
        </Card>
    )
}
