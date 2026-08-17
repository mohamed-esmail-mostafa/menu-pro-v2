<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\WebsiteSettingController;
use Illuminate\Support\Facades\Route;

Route::controller(WebsiteSettingController::class)->group(function () {
  Route::get('admin/website/setting' , 'setting_page');
});