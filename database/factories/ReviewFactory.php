<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Parking;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'parking_id' => Parking::inRandomOrder()->first()?->id ?? Parking::factory(),
            'booking_id' => Booking::inRandomOrder()->first()?->id ?? Booking::factory(),
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->text(300),
        ];
    }
}
