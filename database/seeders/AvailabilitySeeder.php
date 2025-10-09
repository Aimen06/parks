<?php

namespace Database\Seeders;

use App\Models\Availability;
use App\Models\Parking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Parking::factory(50)->create()->each(function ($parking) {
            $isWeek = fake()->boolean(70); // 70% semaine, 30% weekend

            if ($isWeek) {
                // Lundi à vendredi (1 à 5)
                foreach (range(1, 5) as $day) {
                    Availability::factory()->create([
                        'parking_id' => $parking->id,
                        'day_of_week' => $day,
                        'start_time' => '07:00',
                        'end_time' => '18:00',
                    ]);
                }
            } else {
                // Samedi et dimanche (6 et 7)
                foreach ([6, 7] as $day) {
                    Availability::factory()->create([
                        'parking_id' => $parking->id,
                        'day_of_week' => $day,
                        'start_time' => '10:00',
                        'end_time' => '16:00',
                    ]);
                }
            }
        });
    }
}
