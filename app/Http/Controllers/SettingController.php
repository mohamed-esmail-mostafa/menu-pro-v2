<?php

namespace App\Http\Controllers;

use App\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
     public function __construct(protected SettingService $settingService) {}
    

    // update_settings
    public function settings()
    {
        return Inertia::render(
            "setting/index",
            ['setting' => $this->settingService->getSetting()]
        );
    }

    public function update_settings(Request $request)
    {
        
        $this->settingService->updateSetting($request);
        return redirect()->back();
    }
}
