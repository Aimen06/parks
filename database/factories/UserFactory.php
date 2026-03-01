<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $uniqueId = Str::random(5);
        return [
            'firstname' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'email' => "aimen2nice+{$uniqueId}@gmail.com",
            'email_verified_at' => now(),
            'password' => Hash::make('Azerty1234'),
            'role_id' => $this->faker->numberBetween(2, 4),
            'address' => $this->faker->streetAddress,
            'zipcode' => $this->faker->postcode,
            'city' => $this->faker->city,
            'phone_number' => $this->faker->phoneNumber,
            'rgpd' => true,
        ];
    }
}
