<?php

namespace Database\Factories;

use App\Models\BillingMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingMethod>
 */
class BillingMethodFactory extends Factory
{
    protected $model = BillingMethod::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['cb', 'rib', 'paypal']);

        $data = match ($type) {
            'cb' => [
                'name'  => 'Ma CB',
                'value' => $this->faker->creditCardNumber(),
            ],
            'rib' => [
                'name'  => 'Mon RIB',
                'value' => $this->faker->iban('FR'),
            ],
            'paypal' => [
                'name'  => 'Mon PayPal',
                'value' => $this->faker->safeEmail(),
            ],
        };

        return [
            'user_id'    => User::inRandomOrder()->first()?->id ?? User::factory(),
            'name'       => $data['name'],
            'type'       => $type,
            'value'      => $data['value'],
            'is_default' => $this->faker->boolean(20),
        ];
    }
}
