<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\User;
use App\Models\BillingMethod;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        $invoice = Invoice::inRandomOrder()->first() ?? Invoice::factory()->create();
        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        $billingMethod = BillingMethod::where('user_id', $user->id)->first()
            ?? BillingMethod::factory()->create(['user_id' => $user->id]);
        $status = $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed', 'failed', 'refunded']);

        return [
            'invoice_id'        => $invoice->id,
            'user_id'           => $user->id,
            'billing_method_id' => $billingMethod->id,
            'reference'         => 'REF-' . strtoupper($this->faker->bothify('##??###')),
            'amount'            => (int) ($invoice->total_amount * 100),
            'status'            => $status,
            'failure_reason'    => ($status === 'failed') ? $this->faker->sentence() : null,
        ];
    }
}
