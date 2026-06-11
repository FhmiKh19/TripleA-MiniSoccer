<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Place in: app/Models/Pembatalan.php
class Pembatalan extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'user_id',
        'reason',
        'status',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
