<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

       protected $fillable = [
        'store_id',
        'name',
        'description',
        'image',
        'public_id',
        'position',
    ];

   
    // public function products()
    // {
    //     return $this->hasMany(Product::class);
    // }

    public function stores()
    {
        // return $this->belongsTo(Store::class);
        $this->belongsToMany(Store::class,'store_categories')->withPivot([
            'name',
            'image',
            'slug',
            'description',
            'position'
        ])->withTimestamps();
    }

}
