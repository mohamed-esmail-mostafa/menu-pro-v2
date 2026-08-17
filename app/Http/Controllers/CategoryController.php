<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Store;
use App\Models\StoreCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function categories_store_page(string $slug){
        $categories = Category::all();
        $store = Store::with("categories")->where('slug' , $slug)->firstOrFail();
        return Inertia::render("categories/index",[
            "store"=>$store,
            "categories"=>$categories
        ]);
    }

public function assign_category_to_store(Request $request){
   
    $request->validate([
        'store_id' => ['required', 'exists:stores,id'],
        'category_id' => ['required', 'exists:categories,id'],
    ]);

    $store = Store::findOrFail($request->store_id);

    $category = Category::findOrFail($request->category_id);

    $store->categories()->syncWithoutDetaching([
        $category->id => [
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'image' => $category->image,
            'public_id' => $category->public_id,
            'position' => $category->position,
        ]
    ]);

    return redirect()->back();
}
  
}
