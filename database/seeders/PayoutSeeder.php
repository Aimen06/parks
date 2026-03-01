<?php

namespace Database\Seeders;

use App\Models\Payout;
use Illuminate\Database\Seeder;

class PayoutSeeder extends Seeder
{
    public function run(): void
    {
        Payout::factory()->count(15)->create();
    }
}
