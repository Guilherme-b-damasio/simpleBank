<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Account extends Model
{
    protected $fillable = [
        'user_id',
        'balance',
        'credit_limit',
    ];

    protected $casts = [
        'balance' => 'float',
        'credit_limit' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
