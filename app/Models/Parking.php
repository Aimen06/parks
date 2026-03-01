<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parking extends Model
{
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
        'has_charge',  // Corrigé
        'is_exterior', // Corrigé
        'is_box',      // Corrigé
        'user_id',     // Corrigé
        'price_per_hour',
        'available',
        'image_url',   // Corrigé
    ];

    protected $casts = [
        'has_charge'  => 'boolean',
        'is_exterior' => 'boolean',
        'is_box'      => 'boolean',
        'available'   => 'boolean',
        'latitude'    => 'float',
        'longitude'   => 'float',
        'height'      => 'integer', // Changé en integer suite au passage en smallInteger
        'width'       => 'integer',
        'length'      => 'integer',
    ];

    /**
     * Relation vers l'utilisateur (propriétaire)
     */
    public function user() // Renommé pour cohérence avec user_id
    {
        return $this->belongsTo(User::class);
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
