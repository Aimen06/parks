<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $invoiceId = Invoice::inRandomOrder()->first()?->id ?? Invoice::factory();
        return [
            'invoice_id' => $invoiceId,
            'rate' => $this->faker->numberBetween(10, 60),
        ];
    }
}
