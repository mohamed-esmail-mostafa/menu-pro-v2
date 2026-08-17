<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWebsiteSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name_en'        => 'nullable|string|max:255',
            'name_ar'        => 'nullable|string|max:255',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'keywords_en'    => 'nullable|string',
            'keywords_ar'    => 'nullable|string',
            'email'          => 'nullable|email|max:255',
            'phone'          => 'nullable|string|max:255',
            'whatsup'        => 'nullable|string|max:255',
            'address'        => 'nullable|string',
            'facebook'       => 'nullable|nullable|string|max:255',
            'instagram'      => 'nullable|nullable|string|max:255',
            'tiktok'         => 'nullable|nullable|string|max:255',
            'light_logo'     => 'nullable',
            'dark_logo'      => 'nullable',
            'favicon'        => 'nullable',
        ];
    }
}
