<?php

namespace App\Models;

use App\Models\Country;
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
}
