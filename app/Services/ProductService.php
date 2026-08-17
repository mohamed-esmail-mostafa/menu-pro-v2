<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;
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
        // $product->is_simple = filter_var($request->is_simple,);
        // $product->is_featured = filter_var($request->is_featured);

          if ($request->hasFile('image')) {
            $imageResult = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'stores/products');
            $product->image = $imageResult['url'] ?? null;
            $product->public_id = $imageResult['public_id'] ?? null;
        };
        $product->save();
        return $product;
    }
}
