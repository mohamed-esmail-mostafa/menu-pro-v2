<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home_page(){
        return Inertia::render("home/index");
    }







    // admin
    public function admin_dashboard(){
        return Inertia::render("admin-dashboard/index");
    }

     public function admin_categories_page(){
        $categories = Category::all();
        return Inertia::render("categories/admin-categories",[
            "categories"=>$categories
        ]);
    }


     public function admin_countries_page(){
        $countries = Country::all();
        return Inertia::render("countries/index",[
            "countries"=>$countries
        ]);
    }
}
