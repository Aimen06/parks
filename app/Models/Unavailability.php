<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unavailability extends Model
{
    /** @use HasFactory<\Database\Factories\UnavailabilityFactory> */
    use HasFactory ,SoftDeletes;

    protected $fillable = [
        'parking_id',
        'start_date',
        'start_time',
        'end_date',
        'end_time',
        'reason'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime'
    ];

    /**
     * Relations
     */
    public function parking()
    {
        return $this->belongsTo(Parking::class);
    }
}
