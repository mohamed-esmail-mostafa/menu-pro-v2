import { Button } from '@/components/ui/button';
import useImport from '@/hooks/use-import';
import { Plus } from 'lucide-react';
import React from 'react'

export default function AddToCartButton({onAddToCart,product}:any) {
 const {isAr}=useImport();
  return (
     <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            className="h-8 px-3 rounded-full text-xs font-bold gap-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs transition-all active:scale-95"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isAr ? 'أضف' : 'Add'}</span>
                        </Button>
  )
}
