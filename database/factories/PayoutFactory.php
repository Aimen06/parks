<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\User;
use App\Models\Payout;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payout>
 */
class PayoutFactory extends Factory
{
    protected $model = Payout::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $invoice = Invoice::inRandomOrder()->first() ?? Invoice::factory()->create();

        $amount = (int) ($invoice->total_amount * 100);
        $commissionRate = 10; // 10%
        $commissionAmount = (int) ($amount * ($commissionRate / 100));
        $netAmount = $amount - $commissionAmount;

        $status = $this->faker->randomElement(['pending', 'processing', 'confirmed', 'cancelled', 'completed', 'failed']);

        return [
            'invoice_id'      => $invoice->id,
            'user_id'         => User::inRandomOrder()->first()?->id ?? User::factory(),
            'payout_method'   => $this->faker->randomElement(['bank_transfer', 'paypal', 'stripe']),
            'reference'       => 'PAY-' . strtoupper($this->faker->bothify('##??###')),
            'amount'          => $amount,
            'commission_rate' => $commissionRate,
            'net_amount'      => $netAmount,
            'status'          => $status,
            'scheduled_at'    => $this->faker->dateTimeBetween('now', '+1 month'),
            'processed_at'    => in_array($status, ['completed', 'confirmed'])
                ? $this->faker->dateTimeBetween('-1 month', 'now')
                : null,
            'failure_reason'  => ($status === 'failed') ? $this->faker->sentence() : null,
        ];
    }
}
