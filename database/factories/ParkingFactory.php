<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Parking>
 */
class ParkingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Parking',
            'number' => $this->faker->optional()->randomNumber(2),
            'address' => $this->faker->streetAddress,
            'floor' => $this->faker->optional()->randomElement(['-1', '0', '1', '2']),
            'zip' => $this->faker->numerify('#####'),
            'city' => $this->faker->city,
            'latitude' => $this->faker->optional()->latitude,
            'longitude' => $this->faker->optional()->longitude,
            'remark' => $this->faker->optional()->sentence,
            'height' => $this->faker->randomFloat(2, 1.5, 3.5),
            'width' => $this->faker->randomFloat(2, 2.0, 3.0),
            'length' => $this->faker->randomFloat(2, 4.0, 6.0),
            'charge' => $this->faker->boolean,
            'exterior' => $this->faker->boolean,
            'box' => $this->faker->boolean,
            'owner_id' => $this->faker->numberBetween(1, 15), // à adapter à ton UserSeeder
            'price_per_hour' => $this->faker->numberBetween(200, 1500), // en centimes
            'available' => true,
        ];
    }
}
