<?php

namespace App\Http\Controllers;

use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteSettingController extends Controller
{
    public function setting_page(){
        $setting = WebsiteSetting::first();
        return Inertia::render("website-setting/index",[
            "setting"=>$setting
        ]);
    }
}
