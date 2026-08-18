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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->onDelete('cascade'); 
            $table->string('order_number')->unique();
            $table->enum("order_status",["pending","confirmed" , "preparing" ,"ready" , "out_for_delivery" , "delivered" ,"cancelled"])->default("pending");
            $table->enum("payment_status",["pending","paid" , "failed" ,"refunded" ])->default("pending");
            $table->enum("payment_method",["cash","card" , "wallet" ,"online" ])->default("cash");
            $table->decimal("subtotal" , 10,2)->default(0);
            $table->decimal("discount" , 10,2)->default(0);
            $table->decimal("tax" , 10,2)->default(0);
            $table->decimal("delivery_fee" , 10,2)->default(0);
            $table->decimal("total" , 10,2)->default(0);
            $table->string("note")->nullable();

            // customer details
            $table->string("name")->nullable();
            $table->string("phone")->nullable();
            $table->string("address")->nullable();
       
            
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
