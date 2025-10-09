<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Availability extends Model
{
    /** @use HasFactory<\Database\Factories\AvailabilityFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'parking_id',
        'start_time',
        'end_time',
        'available'
    ];

    protected $casts = [
        'available' => 'boolean',
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
