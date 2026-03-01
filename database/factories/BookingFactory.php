<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Booking;
use App\Models\User;
use App\Models\Parking;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        $start = Carbon::instance($this->faker->dateTimeBetween('now', '+3 months'));
        $duration = $this->faker->numberBetween(30, 300); // en minutes
        $end = (clone $start)->addMinutes($duration);

        $user = User::inRandomOrder()->first();
        $parking = Parking::inRandomOrder()->first();
        $status = $this->faker->randomElement(['pending', 'confirmed', 'canceled', 'completed']);

        return [
            'user_id'     => $user?->id ?? User::factory(),
            'parking_id'  => $parking?->id ?? Parking::factory(),
            'start_date'  => $start,
            'end_date'    => $end,
            'duration'    => $duration,
            'total_price' => $parking
                ? (int)(($duration / 60) * $parking->price_per_hour)
                : $this->faker->numberBetween(500, 5000),
            'status'      => $status,
            'cancellation_reason' => $status === 'canceled'
                ? $this->faker->sentence(3)
                : '',
        ];
    }
}
