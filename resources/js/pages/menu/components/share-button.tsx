import { Button } from '@/components/ui/button'
import { Store } from '@/types/store'
import { Share2 } from 'lucide-react'
import React from 'react'

export default function ShareButton({store}:{store:Store}) {
  
  const shareStore = async () =>{
    const url = `${window.location.origin}/${store.slug}`
    if(navigator.share){
        await navigator.share({
            title:store.name,
            text:"Welcome To Our Store"
        })
    }else{
        await navigator.clipboard.writeText(url)
    }
  }
  
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={()=>shareStore()}
            className="relative h-9 w-9 p-0 rounded-full border-border hover:bg-accent hover:text-rose-500 transition-colors"
        // title={isAr ? 'المفضلة' : 'Wishlist'}
        >
            <Share2 className="w-4 h-4" />

        </Button>
    )
}
