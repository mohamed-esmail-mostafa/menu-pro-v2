<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'المقبلات / Appetizers',
            'السلطات / Salads',
            'الشوربات / Soups',
            'الأطباق الرئيسية / Main Courses',
            'المشويات / Grills',
            'البرجر / Burgers',
            'البيتزا / Pizza',
            'الباستا / Pasta',
            'السندوتشات / Sandwiches',
            'المأكولات البحرية / Seafood',
            'الدجاج / Chicken',
            'اللحوم / Meat',
            'الأكل الشرقي / Oriental Food',
            'الإفطار / Breakfast',
            'الحلويات / Desserts',
            'الكيك / Cakes',
            'الآيس كريم / Ice Cream',
            'المخبوزات / Bakery',
            'القهوة / Coffee',
            'المشروبات الساخنة / Hot Drinks',
            'المشروبات الباردة / Cold Drinks',
            'العصائر الطازجة / Fresh Juices',
            'المشروبات الغازية / Soft Drinks',
            'السموثي / Smoothies',
            'الوجبات الجانبية / Sides',
            'الصوصات / Sauces',
            'وجبات الأطفال / Kids Meals',
            'الوجبات المجمعة / Combos',
        ];

        foreach ($categories as $index => $name) {
            $englishName = trim(explode('/', $name)[1] ?? $name);

            Category::updateOrCreate(
                [
                    'slug' => Str::slug($englishName),
                ],
                [
                    'name' => $name,
                    'position' => $index + 1,
                ]
            );
        }
    }
}