<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingService
{
    
    public function __construct(protected CloudinaryService $cloudinaryService){  }


      public function getSetting(){
        return Setting::first();
    }


    public function updateSetting(Request $request){
        $setting = Setting::first();
            if ($setting) {
                $setting->title_en       = $request->title_en;
                $setting->title_ar       = $request->title_ar;
                $setting->description_en = $request->description_en;
                $setting->description_ar = $request->description_ar;
                $setting->keywords_en    = $request->keywords_en;
                $setting->keywords_ar    = $request->keywords_ar;
                $setting->email          = $request->email;
                $setting->phone          = $request->phone;
                $setting->address        = $request->address;
                $setting->currency_en    = $request->currency_en;
                $setting->currency_ar    = $request->currency_ar;

                if ($request->hasFile('logo')) {
                    $this->cloudinaryService->deleteFromCloudinary($setting->public_logo_id);
                    $imagePath     = $this->cloudinaryService->uploadToCloudinary($request->file('logo'), 'stores/logos');
                    $setting->logo = $imagePath;
                }
                if ($request->hasFile('favicon')) {
                    $bannerPath       = $this->cloudinaryService->uploadToCloudinary($request->file('favicon'), 'stores/favicons');
                    $setting->favicon = $bannerPath;
                }

                return $setting->save();
               
            } else {
                $setting                 = new Setting();
                $setting->title_en       = $request->title_en;
                $setting->title_ar       = $request->title_ar;
                $setting->description_en = $request->description_en;
                $setting->description_ar = $request->description_ar;
                $setting->keywords_en    = $request->keywords_en;
                $setting->keywords_ar    = $request->keywords_ar;
                $setting->email          = $request->email;
                $setting->phone          = $request->phone;
                $setting->address        = $request->address;
                $setting->currency_en    = $request->currency_en;
                $setting->currency_ar    = $request->currency_ar;
                if ($request->hasFile('logo')) {
                    $imagePath     = $this->cloudinaryService->uploadToCloudinary($request->file('logo'), 'stores/logos');
                    $setting->logo = $imagePath;
                }
                if ($request->hasFile('favicon')) {
                    $bannerPath       = $this->cloudinaryService->uploadToCloudinary($request->file('favicon'), 'stores/favicons');
                    $setting->favicon = $bannerPath;
                }
                $setting->save();
                return $setting;
    }
    }
}
