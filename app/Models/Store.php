<?php

namespace App\Models;

use App\Models\Country;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    /** @use HasFactory<\Database\Factories\StoreFactory> */
    use HasFactory;

      protected $fillable = [
        'user_id',
        'country_id',
        'slug',
        'name',
        'email',
        'phone',
        'address',
        'image',
        'public_image_id',
        'description',
        'banner',
        'public_banner_id',
        'is_active',
        'is_featured',
        'is_verified',
    ];


     public function country()
    {
        return $this->belongsTo(Country::class);   
    }

     public function user(){
        return $this->belongsTo(User::class);
    }

     public function categories()
    {
        
       return $this->belongsToMany(Category::class,'store_categories','store_id','category_id')->withPivot([
             'id',    
             'name',
            'image',
            'slug',
            'description',
            'position'
        ])->withTimestamps();
    }


    public function store_categories(){
        return $this->hasMany(StoreCategory::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function tables(){
        return $this->hasMany(Table::class);
    }
}
