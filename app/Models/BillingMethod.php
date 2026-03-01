<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BillingMethod extends Model
{
    /** @use HasFactory<\Database\Factories\BillingMethodFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'value',
        'is_default',
    ];

    protected $casts = [
        'user_id'    => 'integer',
        'is_default' => 'boolean',
        'value'      => 'encrypted',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
