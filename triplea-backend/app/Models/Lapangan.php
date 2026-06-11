<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lapangan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'facilities',
        'image',
        'status',
    ];

    protected $casts = [
        'facilities' => 'array',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
