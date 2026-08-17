<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateWebsiteSettingRequest;
use App\Services\WebsiteSettingService;
use Inertia\Inertia;

class WebsiteSettingController extends Controller
{
    public function __construct(
        protected WebsiteSettingService $settingService
    ) {}

    public function setting_page()
    {
        $setting = $this->settingService->getSetting();

        return Inertia::render("website-setting/index", [
            "setting" => $setting
        ]);
    }

    public function update_setting(UpdateWebsiteSettingRequest $request)
    {
        $this->settingService->updateOrCreateSetting($request->validated(), $request);

        return redirect()->back()->with('success', 'Website settings updated successfully.');
    }
}
