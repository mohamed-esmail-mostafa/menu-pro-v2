<?php

namespace App\Services;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Role;
use App\Models\Store;
use App\Models\User;
use App\Services\CloudinaryService;
use App\Services\CountryService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class StoreService
{
       public function __construct(
        protected CloudinaryService $cloudinaryService,
        protected CountryService $countryService
    ) {}


    public function getAllStores()
    {
        return Store::with('user', 'country')->get();
    }

    public function createStore(StoreStoreRequest $request)
    {

      
        $store = new Store();
        $auth = Auth::user();
        $user = User::where('id', $auth->id)->firstOrFail();
        $store->user_id = Auth::user()->id;
        $store->country_id = $request->country_id;
        $store->name = $request->name;
        $store->slug = $request->slug;
        $store->email = $request->email;
        $store->phone = $request->phone;
        $store->address = $request->address;
        $store->description = $request->description;


        if (isset($request['image'])) {
            $imageResult =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'stores/logos'
            );

            $store->image = $imageResult['url'] ?? null;
            $store->public_image_id = $imageResult['public_id'] ?? null;
        }

        // // Upload banner if exists
        if (isset($request['banner'])) {
            $bannerResult =  $this->cloudinaryService->uploadToCloudinary(
                $request['banner'],
                'stores/banners'
            );

            $store->banner = $bannerResult["url"] ?? null;
            $store->public_banner_id = $bannerResult["public_id"] ?? null;
        }

        $vendorRole = Role::where('name', 'vendor')->firstOrFail();
        $user->role_id = $vendorRole->id;
        $user->role = $vendorRole->slug;
        $user->update([
            "role_id" => $vendorRole->id
        ]);
        $store->save();
        return $store;
    }


    public function updateStore(UpdateStoreRequest $request, int $id)
    {

        $store = Store::findOrFail($id);
        $store->country_id = $request->country_id;
        $store->name = $request->name;
        $store->slug = $request->slug;
        $store->email = $request->store_email;
        $store->phone = $request->store_phone;
        $store->address = $request->store_address;
        $store->description = $request->store_description;


        if (isset($request['image'])) {
            $imagePath =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'stores/logos'
            );

            $store->image = $imagePath;
        }

        // // Upload banner if exists
        if (isset($request['banner'])) {
            $bannerPath =  $this->cloudinaryService->uploadToCloudinary(
                $request['banner'],
                'stores/banners'
            );

            $store->banner = $bannerPath;
        }


        if (isset($request['name']) && $request['name'] !== $store->name) {
            $request['slug'] = Str::slug($request['name']);
        }

        $store->save();

        return $store;
    }


    public function deleteStore(int $id)
    {
        $store = Store::findOrFail($id);
        $store->delete();
        return true;
    }

    public function toggleStatus(int $id, string $field, bool $value)
    {
        $store = Store::findOrFail($id);

        $store->update([
            $field => $value
        ]);

        return $store;
    }



    public function getAuthStores(){
        $user = Auth::user();
        $stores = $user->stores;
        return $stores;
    }
}
