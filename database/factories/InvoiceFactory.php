<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $booking = Booking::inRandomOrder()->first() ?? Booking::factory()->create();

        // On récupère le prix total du booking comme base HT (en centimes)
        $amountHt = $booking->total_price;
        $taxRate = 20; // 20% par défaut
        $taxAmount = (int) ($amountHt * ($taxRate / 100));
        $totalAmount = ($amountHt + $taxAmount) / 100; // Passage en double (euros)

        return [
            'booking_id'   => $booking->id,
            'number'       => 'INV-' . strtoupper($this->faker->bothify('##??#')),
            'amount_ht'    => $amountHt,
            'tax_rate'     => $taxRate,
            'tax_amount'   => $taxAmount,
            'total_amount' => $totalAmount,
            'status'       => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
            'due_date'     => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
