import useImport from '@/hooks/use-import';
import { Product } from '@/types/product';
import { Heart } from 'lucide-react';


export default function WishlistIcon({product,onToggleWishlist,isInWishlist}:{product:Product,onToggleWishlist:any,isInWishlist:any}) {
   const {isAr}=useImport()
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
            }}
            className={`pointer-events-auto h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs border ${isInWishlist
                    ? 'bg-rose-500 text-white border-rose-500 scale-110'
                    : 'bg-background/80 backdrop-blur-xs text-muted-foreground border-border/60 hover:text-rose-500 hover:bg-background'
                }`}
            title={isAr ? 'حفظ في المفضلة' : 'Toggle wishlist'}
        >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
    )
}
