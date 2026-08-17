<?php

use App\Http\Controllers\WebsiteSettingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->controller(WebsiteSettingController::class)->group(function () {


    Route::get('admin/website/setting', 'setting_page')->name('website-setting.index');
    Route::post('admin/website/setting', 'update_setting')->name('website-setting.update');


    
});