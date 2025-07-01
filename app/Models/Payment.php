<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory, softDeletes;
    protected $fillable = [
        'invoice_id',
        'rate'
    ];

    protected $casts = [
        'booking_id' => 'integer',
        'rate' => 'integer'
    ];
    /**
     * Relations
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
