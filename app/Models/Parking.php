<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parking extends Model
{
    /** @use HasFactory<\Database\Factories\ParkingFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'number',
        'address',
        'floor',
        'zip',
        'city',
        'latitude',
        'longitude',
        'remark',
        'height',
        'width',
        'length',
        'charge',
        'exterior',
        'box',
        'owner_id',
        'price_per_hour',
        'available',
    ];

    protected $casts = [
        'charge' => 'boolean',
        'exterior' => 'boolean',
        'box' => 'boolean',
        'available' => 'boolean',
        'latitude' => 'float',
        'longitude' => 'float',
        'height' => 'float',
        'width' => 'float',
        'length' => 'float',
    ];

    /**
     * Relations
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasManyThrough(Review::class, Booking::class);
    }
}
