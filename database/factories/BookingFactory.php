<?php

namespace Database\Factories;

use Carbon\Carbon;
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
        $entry = Carbon::instance($this->faker->dateTimeBetween('now', '+3 months'));
        $duration = $this->faker->numberBetween(30, 300); // en minutes
        //pour cloner l'objet entry et ajouter des minutes et permettre de ne pas modifier l'original
        $exit = (clone $entry)->addMinutes($duration);
        $customerId = User::inRandomOrder()->first()?->id ?? User::factory();
        $parking = Parking::inRandomOrder()->first();

        return [
            'customer_id' => $customerId,
            'parking_id' => $parking->id ?? Parking::factory(),
            'entry_date' => $entry->format('Y-m-d'),
            'entry_time' => $entry,
            'exit_date' => $exit->format('Y-m-d'),
            'exit_time' => $exit,
            'duration' => $duration,
            'cost' => $parking
                ? ($duration / 60) * $parking->price_per_hour
                : $this->faker->numberBetween(10, 300)
        ];
    }
}
