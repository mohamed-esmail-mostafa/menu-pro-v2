<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            [
                'name_en' => 'Egypt',
                'name_ar' => 'مصر',
                'currency_ar' => 'ج.م',
                'currency_en' => 'E£',
                'code' => 'EG',
            ],
            [
                'name_en' => 'Saudi Arabia',
                'name_ar' => 'السعودية',
                'currency_ar' => 'ر.س',
                'currency_en' => 'SAR',
                'code' => 'SA',
            ],
            [
                'name_en' => 'United Arab Emirates',
                'name_ar' => 'الإمارات العربية المتحدة',
                'currency_ar' => 'د.إ',
                'currency_en' => 'AED',
                'code' => 'AE',
            ],
            [
                'name_en' => 'Qatar',
                'name_ar' => 'قطر',
                'currency_ar' => 'ر.ق',
                'currency_en' => 'QAR',
                'code' => 'QA',
            ],
            [
                'name_en' => 'Kuwait',
                'name_ar' => 'الكويت',
                'currency_ar' => 'د.ك',
                'currency_en' => 'KWD',
                'code' => 'KW',
            ],
            [
                'name_en' => 'Bahrain',
                'name_ar' => 'البحرين',
                'currency_ar' => 'د.ب',
                'currency_en' => 'BHD',
                'code' => 'BH',
            ],
            [
                'name_en' => 'Oman',
                'name_ar' => 'عُمان',
                'currency_ar' => 'ر.ع',
                'currency_en' => 'OMR',
                'code' => 'OM',
            ],
            [
                'name_en' => 'Jordan',
                'name_ar' => 'الأردن',
                'currency_ar' => 'د.أ',
                'currency_en' => 'JOD',
                'code' => 'JO',
            ],
            [
                'name_en' => 'Iraq',
                'name_ar' => 'العراق',
                'currency_ar' => 'د.ع',
                'currency_en' => 'IQD',
                'code' => 'IQ',
            ],
            [
                'name_en' => 'Lebanon',
                'name_ar' => 'لبنان',
                'currency_ar' => 'ل.ل',
                'currency_en' => 'LBP',
                'code' => 'LB',
            ],
            [
                'name_en' => 'Syria',
                'name_ar' => 'سوريا',
                'currency_ar' => 'ل.س',
                'currency_en' => 'SYP',
                'code' => 'SY',
            ],
            [
                'name_en' => 'Palestine',
                'name_ar' => 'فلسطين',
                'currency_ar' => '₪',
                'currency_en' => '₪',
                'code' => 'PS',
            ],
            [
                'name_en' => 'Yemen',
                'name_ar' => 'اليمن',
                'currency_ar' => 'ر.ي',
                'currency_en' => 'YER',
                'code' => 'YE',
            ],
            [
                'name_en' => 'Morocco',
                'name_ar' => 'المغرب',
                'currency_ar' => 'د.م',
                'currency_en' => 'MAD',
                'code' => 'MA',
            ],
            [
                'name_en' => 'Algeria',
                'name_ar' => 'الجزائر',
                'currency_ar' => 'د.ج',
                'currency_en' => 'DZD',
                'code' => 'DZ',
            ],
            [
                'name_en' => 'Tunisia',
                'name_ar' => 'تونس',
                'currency_ar' => 'د.ت',
                'currency_en' => 'TND',
                'code' => 'TN',
            ],
            [
                'name_en' => 'Libya',
                'name_ar' => 'ليبيا',
                'currency_ar' => 'د.ل',
                'currency_en' => 'LYD',
                'code' => 'LY',
            ],
            [
                'name_en' => 'Sudan',
                'name_ar' => 'السودان',
                'currency_ar' => 'ج.س',
                'currency_en' => 'SDG',
                'code' => 'SD',
            ],
            [
                'name_en' => 'Somalia',
                'name_ar' => 'الصومال',
                'currency_ar' => 'ش.ص',
                'currency_en' => 'SOS',
                'code' => 'SO',
            ],
            [
                'name_en' => 'Djibouti',
                'name_ar' => 'جيبوتي',
                'currency_ar' => 'ف.ج',
                'currency_en' => 'DJF',
                'code' => 'DJ',
            ],
            [
                'name_en' => 'Mauritania',
                'name_ar' => 'موريتانيا',
                'currency_ar' => 'أ.م',
                'currency_en' => 'MRU',
                'code' => 'MR',
            ],
            [
                'name_en' => 'Comoros',
                'name_ar' => 'جزر القمر',
                'currency_ar' => 'ف.ق',
                'currency_en' => 'KMF',
                'code' => 'KM',
            ],
        ];

        foreach ($countries as $country) {
            Country::updateOrCreate(
                ['code' => $country['code']],
                $country
            );
        }
    }
}