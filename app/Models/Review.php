<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_id',
        'parking_id',
        'note',
        'comment',
    ];

    protected $casts = [
        'note' => 'integer',
    ];

    /**
     * Relations
     */
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function parking()
    {
        return $this->belongsTo(Parking::class, 'parking_id');
    }
}
