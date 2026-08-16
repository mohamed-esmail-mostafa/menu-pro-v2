<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            [
                'name_en' => 'Egypt',
                'name_ar' => 'مصر',
                'currency_ar' => 'الجنيه المصري',
                'currency_en' => 'Egyptian Pound',
                'code' => 'EG',
            ],
            [
                'name_en' => 'Saudi Arabia',
                'name_ar' => 'السعودية',
                'currency_ar' => 'الريال السعودي',
                'currency_en' => 'Saudi Riyal',
                'code' => 'SA',
            ],
            [
                'name_en' => 'United Arab Emirates',
                'name_ar' => 'الإمارات العربية المتحدة',
                'currency_ar' => 'الدرهم الإماراتي',
                'currency_en' => 'UAE Dirham',
                'code' => 'AE',
            ],
            [
                'name_en' => 'Qatar',
                'name_ar' => 'قطر',
                'currency_ar' => 'الريال القطري',
                'currency_en' => 'Qatari Riyal',
                'code' => 'QA',
            ],
            [
                'name_en' => 'Kuwait',
                'name_ar' => 'الكويت',
                'currency_ar' => 'الدينار الكويتي',
                'currency_en' => 'Kuwaiti Dinar',
                'code' => 'KW',
            ],
            [
                'name_en' => 'Bahrain',
                'name_ar' => 'البحرين',
                'currency_ar' => 'الدينار البحريني',
                'currency_en' => 'Bahraini Dinar',
                'code' => 'BH',
            ],
            [
                'name_en' => 'Oman',
                'name_ar' => 'عُمان',
                'currency_ar' => 'الريال العُماني',
                'currency_en' => 'Omani Rial',
                'code' => 'OM',
            ],
            [
                'name_en' => 'Jordan',
                'name_ar' => 'الأردن',
                'currency_ar' => 'الدينار الأردني',
                'currency_en' => 'Jordanian Dinar',
                'code' => 'JO',
            ],
            [
                'name_en' => 'Iraq',
                'name_ar' => 'العراق',
                'currency_ar' => 'الدينار العراقي',
                'currency_en' => 'Iraqi Dinar',
                'code' => 'IQ',
            ],
            [
                'name_en' => 'Lebanon',
                'name_ar' => 'لبنان',
                'currency_ar' => 'الليرة اللبنانية',
                'currency_en' => 'Lebanese Pound',
                'code' => 'LB',
            ],
            [
                'name_en' => 'Syria',
                'name_ar' => 'سوريا',
                'currency_ar' => 'الليرة السورية',
                'currency_en' => 'Syrian Pound',
                'code' => 'SY',
            ],
            [
                'name_en' => 'Palestine',
                'name_ar' => 'فلسطين',
                'currency_ar' => 'الشيكل الإسرائيلي',
                'currency_en' => 'Israeli New Shekel',
                'code' => 'PS',
            ],
            [
                'name_en' => 'Yemen',
                'name_ar' => 'اليمن',
                'currency_ar' => 'الريال اليمني',
                'currency_en' => 'Yemeni Rial',
                'code' => 'YE',
            ],
            [
                'name_en' => 'Morocco',
                'name_ar' => 'المغرب',
                'currency_ar' => 'الدرهم المغربي',
                'currency_en' => 'Moroccan Dirham',
                'code' => 'MA',
            ],
            [
                'name_en' => 'Algeria',
                'name_ar' => 'الجزائر',
                'currency_ar' => 'الدينار الجزائري',
                'currency_en' => 'Algerian Dinar',
                'code' => 'DZ',
            ],
            [
                'name_en' => 'Tunisia',
                'name_ar' => 'تونس',
                'currency_ar' => 'الدينار التونسي',
                'currency_en' => 'Tunisian Dinar',
                'code' => 'TN',
            ],
            [
                'name_en' => 'Libya',
                'name_ar' => 'ليبيا',
                'currency_ar' => 'الدينار الليبي',
                'currency_en' => 'Libyan Dinar',
                'code' => 'LY',
            ],
            [
                'name_en' => 'Sudan',
                'name_ar' => 'السودان',
                'currency_ar' => 'الجنيه السوداني',
                'currency_en' => 'Sudanese Pound',
                'code' => 'SD',
            ],
            [
                'name_en' => 'Somalia',
                'name_ar' => 'الصومال',
                'currency_ar' => 'الشلن الصومالي',
                'currency_en' => 'Somali Shilling',
                'code' => 'SO',
            ],
            [
                'name_en' => 'Djibouti',
                'name_ar' => 'جيبوتي',
                'currency_ar' => 'الفرنك الجيبوتي',
                'currency_en' => 'Djiboutian Franc',
                'code' => 'DJ',
            ],
            [
                'name_en' => 'Mauritania',
                'name_ar' => 'موريتانيا',
                'currency_ar' => 'الأوقية الموريتانية',
                'currency_en' => 'Mauritanian Ouguiya',
                'code' => 'MR',
            ],
            [
                'name_en' => 'Comoros',
                'name_ar' => 'جزر القمر',
                'currency_ar' => 'الفرنك القمري',
                'currency_en' => 'Comorian Franc',
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
