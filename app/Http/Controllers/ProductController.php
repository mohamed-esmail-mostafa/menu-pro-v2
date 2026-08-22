<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\Store;
use App\Models\StoreCategory;
use App\Services\AttributeService;
use App\Services\ProductService;
use App\Services\StoreService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use SpomkyLabs\Pki\X501\ASN1\AttributeValue\AttributeValue;

class ProductController extends Controller
{

    public function __construct(
        protected ProductService $productService , 
        protected AttributeService $attributeService,
        protected StoreService $storeService
    ){}
    
    
    
    public function store_products_page(string $slug)
    {



        // $store = Store::with(['categories', 'products.productAttributes.attribute' , 'products.productAttributes.values' , 'country'])->where('slug', $slug)->firstOrFail();
       
       
        // $products = $store->products->map(function($product){
        //     return [
        //         "product"=>$product,
        //         "attributes"=> $product->productAttributes->map(function($productAttribute){
                    
        //             return [
        //                 // "productAttribute"=>$productAttribute,
        //                 "id"=>$productAttribute->id,
        //                 "name"=>$productAttribute["attribute"]["name"],
        //                 "values"=>$productAttribute->values->map(function($value){
        //                     return [
        //                         'id'=>$value->id,
        //                         'value'=>$value->value,
        //                     ];
        //                 })
        //             ];
        //         })
        //     ];
        // });
        return Inertia::render('products/index', [
            'store' => $this->storeService->getStore($slug),
            'products'=> $this->storeService->getStoreProducts($slug),
            'categories'=> $this->storeService->getStoreCategories($slug),
            'attributes' => $this->attributeService->getAllAttributes(),
        ]);
    }

    public function store_products_to_store(Request $request)
    {
        $product = $this->productService->storeProduct($request);
        $store = Store::find($request->store_id);
        if ($store) {
            return redirect()->route('store.products.page', ['slug' => $store->slug])->with('success', 'Product created successfully.');
        }
        return redirect()->back();
    }

    public function update_product(Request $request, $id)
    {
        $isSimple = filter_var($request->is_simple, FILTER_VALIDATE_BOOLEAN);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => $isSimple ? 'required|numeric|min:0' : 'nullable|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'image' => 'nullable',
            'store_category_id' => 'required',
            'is_simple' => 'nullable',
            'is_featured' => 'nullable',
        ]);

        $imagePath = $product->image;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imagePath = '/storage/' . $file->store('products', 'public');
        }

        $storeCategoryId = $request->store_category_id;
        $storeCategory = StoreCategory::find($storeCategoryId);
        if (!$storeCategory) {
            $storeCategory = StoreCategory::where('store_id', $product->store_id)
                ->where('category_id', $request->store_category_id)
                ->first();
            if ($storeCategory) {
                $storeCategoryId = $storeCategory->id;
            }
        }

        $isSimple = filter_var($request->is_simple, FILTER_VALIDATE_BOOLEAN);

        $product->update([
            'store_category_id' => $storeCategoryId ?: $product->store_category_id,
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'price' => $request->price ?? 0,
            'sale_price' => $request->sale_price ?: null,
            'is_simple' => $isSimple,
            'is_featured' => filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN),
        ]);

        if (!$isSimple && $request->has('attribute_rows')) {
            $rows = is_string($request->attribute_rows) ? json_decode($request->attribute_rows, true) : $request->attribute_rows;
            if (is_array($rows)) {
                $this->productService->saveProductAttributesData($product, $rows);
            }
        } elseif ($isSimple) {
            $product->productAttributes()->each(function($attribute){
                $attribute->values()->delete();
                $attribute->delete();
            });
        }

        $store = Store::find($product->store_id);
        if ($store) {
            return redirect()->route('store.products.page', ['slug' => $store->slug])->with('success', 'Product updated successfully.');
        }

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function delete_product(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->back();
    }

    public function add_product_attributes(Request $request)
    {
        $this->productService->add_product_attributes($request);
        return redirect()->back();
    }

    public function remove_product_attribute(int $id)
    {
        $product_value = ProductAttributeValue::findOrFail($id);
        $product_value->delete();
        return redirect()->back();
    }

    public function create_product_page(string $slug)
    {
        $store = $this->storeService->getStore($slug);
        return Inertia::render('products/create', [
            'store' => $store,
            'categories' => $this->storeService->getStoreCategories($slug),
            'attributes' => $this->attributeService->getAllAttributes(),
        ]);
    }

    public function update_product_page(int $id)
    {
        $product = Product::findOrFail($id);
        $store = Store::with('country')->findOrFail($product->store_id);

        return Inertia::render('products/update', [
            'product' => $product,
            'store' => $store,
            'categories' => $this->storeService->getStoreCategories($store->slug),
            'attributes' => $this->attributeService->getAllAttributes(),
        ]);
    }
}
