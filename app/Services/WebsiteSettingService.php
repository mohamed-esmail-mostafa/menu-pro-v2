<?php

namespace App\Services;

use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class WebsiteSettingService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}

    public function getSetting(): ?WebsiteSetting
    {
        return WebsiteSetting::first();
    }

    public function updateOrCreateSetting(array $validatedData, Request $request): WebsiteSetting
    {
        $setting = WebsiteSetting::first() ?? new WebsiteSetting();

        $setting->name_en        = $validatedData['name_en'] ?? null;
        $setting->name_ar        = $validatedData['name_ar'] ?? null;
        $setting->description_en = $validatedData['description_en'] ?? null;
        $setting->description_ar = $validatedData['description_ar'] ?? null;
        $setting->keywords_en    = $validatedData['keywords_en'] ?? null;
        $setting->keywords_ar    = $validatedData['keywords_ar'] ?? null;
        $setting->email          = $validatedData['email'] ?? null;
        $setting->phone          = $validatedData['phone'] ?? null;
        $setting->whatsup        = $validatedData['whatsup'] ?? null;
        $setting->address        = $validatedData['address'] ?? null;
        $setting->facebook       = $validatedData['facebook'] ?? null;
        $setting->instagram      = $validatedData['instagram'] ?? null;
        $setting->tiktok         = $validatedData['tiktok'] ?? null;

        // Handle light_logo upload
        if ($request->hasFile('light_logo')) {
            if ($setting->public_light_logo_id) {
                $this->cloudinaryService->deleteFromCloudinary($setting->public_light_logo_id);
            }
            $lightLogoResult = $this->cloudinaryService->uploadToCloudinary(
                $request->file('light_logo'),
                'website/logos'
            );
            if ($lightLogoResult) {
                $setting->light_logo          = $lightLogoResult['url'];
                $setting->public_light_logo_id = $lightLogoResult['public_id'];
            }
        }

        // Handle dark_logo upload
        if ($request->hasFile('dark_logo')) {
            if ($setting->public_dark_logo_id) {
                $this->cloudinaryService->deleteFromCloudinary($setting->public_dark_logo_id);
            }
            $darkLogoResult = $this->cloudinaryService->uploadToCloudinary(
                $request->file('dark_logo'),
                'website/logos'
            );
            if ($darkLogoResult) {
                $setting->dark_logo          = $darkLogoResult['url'];
                $setting->public_dark_logo_id = $darkLogoResult['public_id'];
            }
        }

        // Handle favicon upload
        if ($request->hasFile('favicon')) {
            if ($setting->public_favicon_id) {
                $this->cloudinaryService->deleteFromCloudinary($setting->public_favicon_id);
            }
            $faviconResult = $this->cloudinaryService->uploadToCloudinary(
                $request->file('favicon'),
                'website/favicons'
            );
            if ($faviconResult) {
                $setting->favicon          = $faviconResult['url'];
                $setting->public_favicon_id = $faviconResult['public_id'];
            }
        }

        Cache::forget('settings');
        $setting->save();
        return $setting;
    }
}
