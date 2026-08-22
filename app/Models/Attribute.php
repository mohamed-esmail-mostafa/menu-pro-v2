<?php

namespace App\Models;

use App\Models\Product;
use App\Models\ProductAttribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;

     public function products(){
        return $this->belongsToMany(Product::class,'product_attributes')->withPivot([
            'id',
            'is_required',
            'selection_type'
        ]);
    }


     public function productAttributes(){
        return $this->hasMany(ProductAttribute::class);
    }
}
