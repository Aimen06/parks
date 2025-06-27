<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'customer_id',
        'parking_id',
        'entry_time',
        'exit_time',
        'duration',
        'cost',
    ];

    protected $casts = [
        'entry_time' => 'datetime',
        'exit_time' => 'datetime',
        'duration' => 'integer',
        'cost' => 'integer', // En centimes
    ];

    // Une réservation concerne un parking
    public function parking()
    {
        return $this->belongsTo(Parking::class);
    }

    // Une réservation peut avoir une review
    public function review()
    {
        return $this->hasOne(Review::class);
    }

    // Une réservation peut être associée à un paiement
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
