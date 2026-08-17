<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

        protected $fillable = [
        'category_id',
        'store_id',
        'title',
        'description',
        'image',
        'public_id',
        'price',
        'sale_price',
        'is_featured',
        'is_simple'
    ];


     public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
