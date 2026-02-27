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
        Schema::table('parkings', function (Blueprint $table) {
            $table->renameColumn('owner_id', 'user_id');
            $table->renameColumn('charge', 'has_charge');
            $table->renameColumn('exterior', 'is_exterior');
            $table->renameColumn('box', 'is_box');
            $table->renameColumn('image_1', 'image_url');
            $table->dropColumn('image_2','image_3');
            $table->smallInteger('height')->change();
            $table->smallInteger('width')->change();
            $table->smallInteger('length')->change();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('parkings', function (Blueprint $table) {
            $table->renameColumn('user_id', 'owner_id');
            $table->renameColumn('has_charge', 'charge');
            $table->renameColumn('is_exterior', 'exterior');
            $table->renameColumn('is_box', 'box');
            $table->renameColumn('image_url', 'image_1');
            $table->string('image_2',200)->nullable();
            $table->string('image_3',200)->nullable();
            $table->double('height')->change();
            $table->double('width')->change();
            $table->double('length')->change();        });
    }
};
