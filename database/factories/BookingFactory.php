<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Booking;
use App\Models\User;
use App\Models\Parking;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    protected $model = Booking::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $entry = $this->faker->dateTimeBetween('+1 days', '+5 days');
        $duration = $this->faker->numberBetween(30, 300); // en minutes
        $exit = (clone $entry)->modify("+{$duration} minutes");
        $customerId = User::inRandomOrder()->first()?->id ?? User::factory();
        $parking = Parking::inRandomOrder()->first();

        return [
            'customer_id' => $customerId,
            'parking_id' => $parking->id ?? Parking::factory(),
            'entry_time' => $entry,
            'exit_time' => $exit,
            'duration' => $duration,
            'cost' => $duration/60 * $parking->price_per_hour ?? $this->faker->numberBetween(10, 300), // Calcul du coût en fonction du prix par minute
        ];
    }
}
