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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->foreignId('store_category_id')->constrained("store_categories")->onDelete('cascade');
            $table->string('title')->nullable();
            $table->string('slug')->unique();
            $table->longText('description')->nullable();
            $table->longText('image')->nullable();
            $table->longText('public_id')->nullable();
            $table->decimal('price',10,2)->nullable();
            $table->decimal('sale_price',10,2)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_simple')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
