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
        'name',
        'default',
    ];

    protected $casts = [
        'default' => 'boolean',
    ];

}
