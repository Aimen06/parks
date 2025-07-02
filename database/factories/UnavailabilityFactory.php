<?php

namespace Database\Factories;

use App\Models\Parking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unavailability>
 */
class UnavailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Génère la date et l'heure de début
        $startDateTime = $this->faker->dateTimeBetween('now', '+1 year');
        $startDate = $startDateTime->format('Y-m-d');
        $startTime = $startDateTime->format('H:i');

        // Tirage au sort: courte (3 à 24h) ou longue (jusqu’à 1 an)
        if ($this->faker->boolean(50)) {
            // Fermeture courte (3 à 24h max)
            $durationMinutes = rand(180, 1440); // 3h à 24h en minutes
            $endDateTime = (clone $startDateTime)->modify("+$durationMinutes minutes");
        } else {
            // Fermeture longue: entre 2 jours et 365 jours après
            $endDateTime = $this->faker->dateTimeBetween($startDateTime, (clone $startDateTime)->modify('+1 year'));
        }

        $endDate = $endDateTime->format('Y-m-d');
        $endTime = $endDateTime->format('H:i');

        return [
            'parking_id' => Parking::inRandomOrder()->first()?->id ?? Parking::factory(),
            'start_date' => $startDate,
            'start_time' => $startTime,
            'end_date'   => $endDate,
            'end_time'   => $endTime,
            'reason'     => $this->faker->randomElement(['travaux', 'flood', 'vacation', 'other']),
        ];
    }
}
