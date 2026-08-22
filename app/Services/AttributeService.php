<?php

namespace App\Services;

use App\Models\Attribute;

class AttributeService
{
   public function getAllAttributes(){
    return Attribute::all();
   }
}
