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
        Schema::create('payouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('payout_method', ['bank_transfer', 'paypal', 'stripe']);
            $table->string('reference', 50);
            $table->integer('amount');
            $table->integer('commission_rate');
            $table->integer('net_amount');
            $table->enum('status', ['pending', 'processing', 'confirmed', 'cancelled', 'completed', 'failed'])->default('pending');
            $table->dateTime('scheduled_at');
            $table->dateTime('processed_at')->nullable();
            $table->string('failure_reason', 255)->nullable();
            $table->softDeletes(); // Pour le SoftDelete que vous avez demandé
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};
