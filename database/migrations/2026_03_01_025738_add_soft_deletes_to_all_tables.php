<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Liste des tables à mettre à jour
        $tables = [
            'roles', 'parkings', 'bookings', 'reviews',
            'invoices', 'payments', 'billing_methods',
            'availabilities', 'unavailabilities', 'favorites', 'payouts'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName) && !Schema::hasColumn($tableName, 'deleted_at')) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->softDeletes();
                });
            }
        }
    }

    public function down(): void
    {
        $tables = [
            'roles', 'parkings', 'bookings', 'reviews',
            'invoices', 'payments', 'billing_methods',
            'availabilities', 'unavailabilities', 'favorites', 'payouts'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasColumn($tableName, 'deleted_at')) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropSoftDeletes();
                });
            }
        }
    }
};
