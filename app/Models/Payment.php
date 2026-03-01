<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice_id',
        'user_id',
        'billing_method_id',
        'reference',
        'amount',
        'status',
        'failure_reason',
    ];

    protected $casts = [
        'invoice_id'        => 'integer',
        'user_id'           => 'integer',
        'billing_method_id' => 'integer',
        'amount'            => 'integer',
    ];

    /**
     * Relations
     */

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function billingMethod()
    {
        return $this->belongsTo(BillingMethod::class);
    }
}
