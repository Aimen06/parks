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
            'parking_id' => Parking::inRandomOrder()->first()?->id ?? Parking::factory(),
            'day_of_week' => $this->faker->numberBetween(1, 7), // 1 pour lundi, 7 pour dimanche
            'start_time' => $this->faker->time('H:i', '08:00'),
            'end_time' => $this->faker->time('H:i', '20:00'),
            'is_available' => $this->faker->boolean(70), // 80% de chances d'être disponible
        ];
    }
}
