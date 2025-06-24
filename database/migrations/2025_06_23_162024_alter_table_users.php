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
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstname', 50)
                ->after('id');

            $table->string('lastname', 50)
                ->after('firstname');
            $table->integer('role_id')->after('lastname');
            $table->string('address')->after('role_id');
            $table->string('zip', 5)->after('address');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('firstname');
        Schema::dropIfExists('lastname');
        Schema::dropIfExists('role_id');
        Schema::dropIfExists('address');
        Schema::dropIfExists('zip');
    }
};
