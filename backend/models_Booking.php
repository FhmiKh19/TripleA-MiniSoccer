<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Place in: app/Models/Booking.php
class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
        'user_id',
        'lapangan_id',
        'date',
        'start_time',
        'end_time',
        'duration',
        'total_price',
        'down_payment',
        'remaining_payment',
        'income_received',
        'payment_status',
        'booking_status',
        'payment_proof',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class);
    }

    public function pembatalan()
    {
        return $this->hasOne(Pembatalan::class);
    }
}
