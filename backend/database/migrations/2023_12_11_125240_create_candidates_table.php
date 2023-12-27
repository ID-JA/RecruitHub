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
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->json('skills')->nullable();
            $table->text('bio')->nullable();
            $table->json('experience')->nullable();
            $table->text('education')->nullable();
            $table->string('resume')->nullable();
            $table->string('title')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->json('social')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
