<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_id',
        'number',
        'amount_ht',
        'tax_rate',
        'tax_amount',
        'total_amount',
        'status',
        'due_date'
    ];

    protected $casts = [
        'booking_id'   => 'integer',
        'amount_ht'    => 'integer',
        'tax_rate'     => 'integer',
        'tax_amount'   => 'integer',
        'total_amount' => 'double',
        'due_date'     => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function payout()
    {
        return $this->hasOne(Payout::class);
    }
}
