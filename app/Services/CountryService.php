<?php

namespace App\Services;

use App\Models\Country;

class CountryService
{
      public function getAll(){
        return Country::latest()->get();
    }




    public function getById($id){
        return Country::findOrFail($id);
    }


    public function storeCountry( array $data ){
      return Country::create( $data );
    }


    public function updateCountry(int $id, array $data ){
         $country = Country::findOrFail($id);
         $country = Country::update( $data );
        return $country;
    }



    public function deleteCountry(int $id){
        $country = Country::findOrFail($id);
        $country->delete();
        return true;
    }
}
