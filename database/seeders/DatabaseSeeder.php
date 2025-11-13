<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. D'abord les Rôles (car les Utilisateurs en dépendent)
        $this->call(RoleSeeder::class);

        // 2. Ensuite les Utilisateurs
        $this->call(UserSeeder::class);

        // 3. Ensuite les Parkings (car d'autres tables en dépendent)
        $this->call(ParkingSeeder::class);

        // 4. Tout le reste
        $this->call([
            AvailabilitySeeder::class,
            UnavailabilitySeeder::class,
            BookingSeeder::class,
            ReviewSeeder::class,
            InvoiceSeeder::class,
            PaymentSeeder::class,
            BillingMethodSeeder::class,
        ]);
    }
}
