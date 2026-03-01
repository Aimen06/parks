<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'parking_id',
        'start_date',
        'end_date',
        'duration',
        'total_price',
        'status',
        'cancellation_reason',
    ];

    protected $casts = [
        'start_date' => 'datetime', // Type dateTime
        'end_date'   => 'datetime', // Type dateTime
        'duration'   => 'integer',
        'total_price' => 'integer',
    ];

    public function user() // Relation mise à jour
    {
        return $this->belongsTo(User::class);
    }

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
