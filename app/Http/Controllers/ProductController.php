<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use App\Models\StoreCategory;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function __construct(protected ProductService $productService){}
    public function store_products_page(string $slug)
    {
        $store = Store::with(['categories', 'products' , 'country'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('products/index', [
            'store' => $store,
        ]);
    }

    public function store_products_to_store(Request $request)
    {
         $this->productService->storeProduct($request);
         return redirect()->back();
    }

    public function update_product(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|max:4096',
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

        $product->update([
            'store_category_id' => $storeCategoryId ?: $product->store_category_id,
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'price' => $request->price,
            'sale_price' => $request->sale_price ?: null,
            'is_simple' => filter_var($request->is_simple, FILTER_VALIDATE_BOOLEAN),
            'is_featured' => filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function delete_product(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->back();
    }
}
