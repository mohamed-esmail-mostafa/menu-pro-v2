<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Store;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}

    public function categories_store_page(string $slug)
    {
        $categories = Category::all();
        $store = Store::with("categories")->where('slug', $slug)->firstOrFail();
        return Inertia::render("categories/index", [
            "store" => $store,
            "categories" => $categories
        ]);
    }

    public function storeCategory(Request $request, ?int $storeId = null)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable'],
            'position' => ['nullable', 'integer'],
        ]);

        $slug = Str::slug($request->name);
        if (empty($slug)) {
            $slug = 'cat-' . time();
        }
        $originalSlug = $slug;
        $count = 1;
        while (Category::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $imageUrl = null;
        $publicId = null;

        if ($request->hasFile('image')) {
            $upload = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'categories');
            if ($upload) {
                $imageUrl = $upload['url'];
                $publicId = $upload['public_id'];
            }
        } elseif (is_string($request->image)) {
            $imageUrl = $request->image;
        }

        $category = Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'image' => $imageUrl,
            'public_id' => $publicId,
            'position' => $request->position ?? 0,
        ]);

        $targetStoreId = $storeId ?? $request->store_id;
        if ($targetStoreId) {
            $store = Store::find($targetStoreId);
            if ($store) {
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
            }
        }

        return redirect()->back();
    }

    public function updateCategory(Request $request, int $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable'],
            'position' => ['nullable', 'integer'],
        ]);

        $slug = $category->slug;
        if ($request->name !== $category->name) {
            $slug = Str::slug($request->name);
            if (empty($slug)) {
                $slug = 'cat-' . time();
            }
            $originalSlug = $slug;
            $count = 1;
            while (Category::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }
        }

        $imageUrl = $category->image;
        $publicId = $category->public_id;

        if ($request->hasFile('image')) {
            if ($category->public_id) {
                $this->cloudinaryService->deleteFromCloudinary($category->public_id);
            }
            $upload = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'categories');
            if ($upload) {
                $imageUrl = $upload['url'];
                $publicId = $upload['public_id'];
            }
        } elseif ($request->image === null && $category->public_id) {
            $this->cloudinaryService->deleteFromCloudinary($category->public_id);
            $imageUrl = null;
            $publicId = null;
        }

        $category->update([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'image' => $imageUrl,
            'public_id' => $publicId,
            'position' => $request->position ?? $category->position,
        ]);

        return redirect()->back();
    }

    public function deleteCategory(int $id)
    {
        $category = Category::findOrFail($id);

        if ($category->public_id) {
            $this->cloudinaryService->deleteFromCloudinary($category->public_id);
        }

        $category->delete();

        return redirect()->back();
    }

    public function assign_category_to_store(Request $request)
    {
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
