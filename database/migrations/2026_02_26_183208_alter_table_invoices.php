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
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('number',10);
            $table->integer('amount_ht');
            $table->smallInteger('tax_rate');
            $table->integer('tax_amount');
            $table->double('total_amount');
            $table->enum('status', ['pending', 'confirmed', 'cancelled','completed'])->default('pending');
            $table->dateTime('due_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('number');
            $table->dropColumn('amount_ht');
            $table->dropColumn('tax_rate');
            $table->dropColumn('tax_amount');
            $table->dropColumn('total_amount');
            $table->dropColumn('status');
            $table->dropColumn('due_date');
        });
    }
};
