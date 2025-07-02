<?php

namespace Database\Factories;

use App\Models\Parking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Availability>
 */
class AvailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parking_id' => Parking::factory(),
            'day_of_week' => 1, // Sera écrasé par le seeder
            'start_time' => '07:00', // Sera écrasé par le seeder
            'end_time' => '18:00',   // Sera écrasé par le seeder
            'is_available' => $this->faker->boolean(70),
        ];
    }
}
