<?php

namespace Database\Seeders;

use App\Models\Unavailability;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnavailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Unavailability::factory(50)->create();
    }
}
