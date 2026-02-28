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
        'entry_date',
        'entry_time',
        'exit_date',
        'exit_time',
        'duration',
        'cost',
    ];

    protected $casts = [
        'entry_time' => 'datetime',
        'entry_date' => 'date',
        'exit_time' => 'datetime',
        'exit_date' => 'date',
        'duration' => 'integer',
        'cost' => 'integer',
    ];

    public function parking()
    {
        return $this->belongsTo(Parking::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
