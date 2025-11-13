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
        Schema::create('parkings', function (Blueprint $table) {
            $table->id(); // PK auto-increment

            // Informations de base
            $table->string('name');
            $table->string('number')->nullable();
            $table->string('address');
            $table->string('floor')->nullable();
            $table->string('zip', 5);
            $table->string('city');

            // Coordonnées GPS
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            // Description
            $table->text('remark')->nullable();

            // Dimensions du parking
            $table->float('height');
            $table->float('width');
            $table->float('length');

            // Equipements et caractéristiques
            $table->boolean('charge')->default(false);    // Borne de recharge
            $table->boolean('exterior')->default(false);  // Extérieur ou non
            $table->boolean('box')->default(false);       // Box fermé ou non

            // Liens et tarifs
            $table->foreignId('owner_id')
                ->constrained('users')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->integer('price_per_hour'); // Stocké en centimes

            $table->boolean('available')->default(true);

            $table->timestamps();
            $table->softDeletes();

            // Indexation
            $table->index('city');
            $table->index('zip');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parkings');
    }
};
