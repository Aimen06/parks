<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import nécessaire

class Payout extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice_id', 'user_id', 'payout_method', 'reference',
        'amount', 'commission_rate', 'net_amount', 'status',
        'scheduled_at', 'processed_at', 'failure_reason'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'processed_at' => 'datetime',
        'amount' => 'integer',
        'commission_rate' => 'integer',
        'net_amount' => 'integer',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function invoice() { return $this->belongsTo(Invoice::class); }
}
