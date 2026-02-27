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
        Schema::table('payments', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('billing_method_id')->constrained();
            $table->string('reference',50);
            $table->integer('amount');
            $table->enum('status', ['pending', 'conformed', 'cancelled', 'completed']);
            $table->string('failure_reason',255);
            $table->dropColumn('rate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropColumn('user_id');
            $table->dropForeign('billing_method_id');
            $table->dropColumn('billing_method_id');
            $table->dropColumn('reference');
            $table->dropColumn('amount');
            $table->dropColumn('status');
            $table->dropColumn('failure_reason');
            $table->integer('rate');
        });
    }
};
