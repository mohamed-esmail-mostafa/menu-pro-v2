<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Store;
use App\Services\CountryService;
use App\Services\StoreService;
use Inertia\Inertia;

class StoreController extends Controller
{
     public function __construct(
        protected StoreService $storeService,
        protected CountryService $countryService
    ) {}


    public function register_store_page()
    {
        return Inertia::render("stores/create", ['countries' => $this->countryService->getAll()]);
    }


    public function create_store(StoreStoreRequest $request)
    {
        $this->storeService->createStore($request);
        return redirect()->route('stores.vendor.page');
    }


    public function update_store_page(string $slug)
    {
        $store = Store::where("slug" , $slug)->firstOrFail();
        return Inertia::render("stores/update",[
            "store"=>$store,
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

    public function store_dashboard(string $slug)
    {

        $store = Store::withCount(["categories","products" , "orders"])->where('slug',$slug)->firstOrFail();
         return Inertia::render('store-dashboard/index', [
            "statistics"=>[
                "categories_count"=>$store->categories_count,
                "products_count"=>$store->products_count,
                "orders_count"=>$store->orders_count,
            ]
        ]);
      
    }




    public function store_menu(string $slug)  {
        
        // $store = Store::with("categories" , "products" , "country")->where("slug" , $slug)->firstOrFail();
        return Inertia::render("menu/index",[
            "store"=>$this->storeService->getStore($slug),
            "products" => $this->storeService->getStoreProducts($slug),
            "categories" => $this->storeService->getStoreCategories($slug),
        ]);
    }
}
