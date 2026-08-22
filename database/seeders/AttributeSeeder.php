<?php

namespace Database\Seeders;

use App\Models\Attribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = [
           'الطعم / Taste' ,
           'الحجم  / Size ' , 
        ];



        foreach($attributes  as $index => $name){
            $englishName = trim(explode('/', $name)[1] ?? $name);

            Attribute::updateOrCreate(
                [
                    'slug' => Str::slug($englishName),
                ],
                [
                    'name' => $name,
                ]
            );
        }
    }
}
