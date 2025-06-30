<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    use HasFactory, softDeletes;
    protected $fillable = [
        'booking_id',
    ];

    protected $casts = [
        'booking_id' => 'integer',
    ];

    /**
     * Relations
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

}
