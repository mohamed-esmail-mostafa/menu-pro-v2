<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Store;
use App\Services\CountryService;
use App\Services\StoreService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreController extends Controller
{
     public function __construct(
        protected StoreService $storeService,
        protected CountryService $countryService
    ) {}


    public function register_store_page()
    {
        $countries = $this->countryService->getAll();
        return Inertia::render("stores/create", [
            'countries' => $countries,
        ]);
    }


    public function create_store(StoreStoreRequest $request)
    {
        $this->storeService->createStore($request);
        return redirect()->route('stores.vendor.page');
    }


    public function update_store_page(int $id)
    {
        return Inertia::render("Stores/update", [
            "store"     => Store::where('id', $id)->first(),
            "countries" => $this->countryService->getAll(),
        ]);
    }

    /**
     * Update store
     *
     */
    public function update_store(UpdateStoreRequest $request, int $id)
    {
        $this->storeService->updateStore($request, $id);
        return redirect()->back();
    }



    public function vendor_stores_page(){
        return Inertia::render('stores/vendor-stores' , [
            "stores"=>$this->storeService->getAuthStores()
        ]);
    }

    public function store_dashboard($storeId = null)
    {
        $stores = $this->storeService->getAuthStores();
        $store = null;
        if ($storeId) {
            $store = Store::find($storeId);
        } else if (count($stores) > 0) {
            $store = $stores[0];
        }

        return Inertia::render('store-dashboard/index', [
            'store'  => $store,
            'stores' => $stores,
        ]);
    }
}
