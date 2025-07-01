<?php

namespace Database\Seeders;

use App\Models\BillingMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BillingMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BillingMethod::factory()->count(50)->create();
    }
}
