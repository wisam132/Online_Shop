<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('product_marke');
            $table->text('product_description');
            $table->decimal('product_price', 10, 2);
            $table->unsignedBigInteger('category_id');
            $table->string('product_photo_primary');
            $table->string('product_photo_secondary_1')->nullable();
            $table->string('product_photo_secondary_2')->nullable();
            $table->string('product_photo_secondary_3')->nullable();
            $table->string('size1')->nullable();
            $table->string('size2')->nullable();
            $table->string('size3')->nullable();
            $table->string('size4')->nullable();
            $table->string('size5')->nullable();
            $table->string('size6')->nullable();
            $table->string('size7')->nullable();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
