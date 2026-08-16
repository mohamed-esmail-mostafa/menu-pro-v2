<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCountryRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
             'name_en'     => 'required|string|max:255|unique:countries,name_en',
                'name_ar'     => 'required|string|max:255|unique:countries,name_ar',
                'currency_en' => 'nullable|string|max:255',
                'currency_ar' => 'nullable|string|max:255',
                'code'        => 'required|string|max:10|unique:countries,code',
        ];
    }
}
