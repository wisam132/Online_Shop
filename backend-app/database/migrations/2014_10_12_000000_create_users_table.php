<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * 
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('tel_number');
            $table->string('strasse');
            $table->string('ZIP_code');
            $table->string('photo')->nullable();
            $table->string('password');
            $table->enum('role', ['user', 'admin'])->default('user');


            $table->timestamps();

        });
    }

    /**
     * 
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
