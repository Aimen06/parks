<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingMethod>
 */
class BillingMethodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'carte bancaire',
                'payPal',
                'apple Pay',
                'google Pay',
                'bank direct debit',
            ]),
            'default' => $this->faker->boolean(30), // 30% de chances d'être "default"
        ];
    }
}
