<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use Illuminate\Http\Request;

// Place in: app/Http/Controllers/Api/PaymentController.php
// Create with: php artisan make:controller Api/PaymentController

class PaymentController
{
    public function upload(Request $request)
    {
        $validated = $request->validate([
            'booking_id'   => 'required|exists:bookings,id',
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $booking = Booking::find($validated['booking_id']);

        // Check apakah user adalah pemilik booking
        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        // Store file
        $path = $request->file('payment_proof')->store('payment_proofs', 'public');
        $booking->update(['payment_proof' => $path]);

        return response()->json([
            'message' => 'Bukti pembayaran berhasil diunggah. Menunggu verifikasi admin.',
            'booking' => $booking,
        ]);
    }
}
