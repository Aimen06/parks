<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'parking_id',
    ];

    // Un favori appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un favori concerne un parking
    public function parking()
    {
        return $this->belongsTo(Parking::class);
    }
}
