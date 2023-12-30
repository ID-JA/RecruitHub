<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('employmentType');
            $table->boolean('showSalary');
            $table->string('salaryCurrency');
            $table->string('salaryTime');
            $table->json('category');
            $table->enum('status',["active","pending","draft","closed","archive"])->default("draft")->change();
            $table->text('motivation');
            $table->text('aboutCompany');
            $table->text('howToApply');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn(['employmentType', 'showSalary', 'salaryCurrency', 'salaryTime', 'category', 'status', 'motivation', 'aboutCompany', 'howToApply']);
        });
    }
};
