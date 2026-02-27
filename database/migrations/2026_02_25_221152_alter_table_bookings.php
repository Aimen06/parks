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
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('entry_date');
            $table->dropColumn('exit_date');
            $table->renameColumn('customer_id', 'user_id');
            $table->renameColumn('entry_time', 'start_date');
            $table->renameColumn('exit_time', 'end_date');
            $table->renameColumn('cost', 'total_price');
            $table->dateTime('start_date')->change();
            $table->dateTime('end_date')->change();
            $table->enum('status', ['pending', 'confirmed','canceled', 'completed'])->default('pending');
            $table->string('cancellation_reason',50);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('entry_date', 255);
            $table->string('exit_date', 255);
            $table->renameColumn('user_id', 'customer_id');
            $table->renameColumn('start_date', 'entry_time');
            $table->renameColumn('end_date', 'exit_time');
            $table->renameColumn('total_price', 'cost');
            $table->dropColumn('start_date');
            $table->dropColumn('end_date');
            $table->dropColumn('status');
            $table->dropColumn('cancellation_reason');
        });
    }
};
