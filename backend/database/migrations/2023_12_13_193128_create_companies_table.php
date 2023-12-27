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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->text('description');
            $table->integer('founded_at')->nullable();
            $table->string('type');
            $table->string('website');
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->string('logo')->default('public/companyDefaultLogo/no-logo.webp');
            $table->integer('revenue')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
