<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;



class ProductService
{
   
    public function __construct(protected CloudinaryService $cloudinaryService){}

    public function storeProduct(Request $request){
        $product = new Product();
        $product->store_id = $request->store_id;
        $product->store_category_id = $request->store_category_id;
        $product->title = $request->title;
        $product->slug = Str::slug($request->title) . '-' . time();
        $product->description = $request->description;
        $product->price = $request->price;
        $product->sale_price = $request->sale_price ?: null;
      

          if ($request->hasFile('image')) {
            $imageResult = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'stores/products');
            $product->image = $imageResult['url'] ?? null;
            $product->public_id = $imageResult['public_id'] ?? null;
        };
        $product->save();
        return $product;
    }


    public function add_product_attributes(Request $request){
          DB::transaction(function () use ($request) {
             $product = Product::findOrFail($request->product_id);
             $product->productAttributes()->each(function($attribute){
              $attribute->values()->delete();
             });
             foreach ($request->values as $row) {
                $product_attributes = ProductAttribute::firstOrCreate([
                    'product_id'      => $request->product_id,
                    'attribute_id' => $row['attribute_id'],
                ]);

            

                $product_values = ProductAttributeValue::create([
                    'product_id'      => $request->product_id,
                    'product_attribute_id' => $product_attributes["id"],
                    'value'        => $row['value'],
                    'price'        => $row['price'] ?? 0,
                    'is_required' => $row['is_required'] ?? false,
                    'is_default' => $row['is_default'] ?? false
                ]); 
            }

            $product->is_simple = false;
            $product->save();
            return $product_values;
        });
    }



    

   
}
