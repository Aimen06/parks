<?php

namespace Database\Factories;

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
        $parkingId = Parking::inRandomOrder()->first()->id ?? Parking::factory();
        $customerId = User::inRandomOrder()->first()->id ?? User::factory();
        return [
            'customer_id' => $customerId,
            'parking_id' => $parkingId,
            'note' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->text(300),
        ];
    }
}
