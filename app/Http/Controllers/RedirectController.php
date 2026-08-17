<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RedirectController extends Controller
{
      public function redirect_to_dashboard()
    {
        $user = Auth::user();
        switch ($user->role) {
            case "vendor": 
                return redirect()->route('stores.vendor.page');
                break;

            case "user":
                return redirect("/");
                break;

            case "admin": 
                return redirect()->route('website-setting.index');
                break;

            default:
                return redirect("/");
        }
    }
}
