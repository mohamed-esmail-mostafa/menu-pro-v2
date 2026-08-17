<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name_en')->nullable();
            $table->string('name_ar')->nullable();
            $table->longText('description_en')->nullable();
            $table->longText('description_ar')->nullable();
            $table->longText('keywords_en')->nullable();
            $table->longText('keywords_ar')->nullable();
            $table->longText('light_logo')->nullable();
            $table->string('public_light_logo_id')->nullable();
            $table->longText('dark_logo')->nullable();
            $table->string('public_dark_logo_id')->nullable();

            $table->longText('favicon')->nullable();
            $table->string('public_favicon_id')->nullable();

            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsup')->nullable();
            $table->longText('address')->nullable();
        

            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('tiktok')->nullable();
         


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_settings');
    }
};
