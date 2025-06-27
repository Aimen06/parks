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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // Clés étrangères
            $table->foreignId('customer_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('parking_id')->constrained('parkings')->restrictOnDelete();

            // Informations de réservation
            $table->timestamp('entry_time');
            $table->timestamp('exit_time');
            $table->integer('duration'); // durée en minutes
            $table->integer('price'); // en centimes (€ x100)

            // Timestamps
            $table->timestamps();
            $table->softDeletes();

            // Indexes utiles
            $table->index('entry_time');
            $table->index('exit_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
