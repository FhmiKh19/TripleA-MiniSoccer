<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\Lapangan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

// Place in: app/Http/Controllers/Api/BookingController.php
// Create with: php artisan make:controller Api/BookingController --api

class BookingController
{
    public function index(Request $request)
    {
        if ($request->user()->role === 'customer') {
            // Customer hanya bisa lihat booking miliknya sendiri
            $bookings = $request->user()->bookings()->with(['lapangan', 'user'])->get();
        } else if ($request->user()->role === 'admin') {
            // Admin bisa lihat semua booking
            $bookings = Booking::with(['lapangan', 'user'])->get();
        } else {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        return response()->json($bookings);
    }

    public function show($id)
    {
        $booking = Booking::with(['lapangan', 'user'])->find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking tidak ditemukan.'], 404);
        }
        return response()->json($booking);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lapangan_id' => 'required|exists:lapangans,id',
            'date'        => 'required|date',
            'start_time'  => 'required|date_format:H:i',
            'end_time'    => 'required|date_format:H:i',
            'duration'    => 'required|integer|min:1',
            'total_price' => 'required|integer|min:0',
        ]);

        // Generate booking code (TRPA-{random})
        $bookingCode = 'TRPA-' . strtoupper(Str::random(6));

        // Calculate down payment (50% dari total)
        $downPayment = $validated['total_price'] / 2;
        $remainingPayment = $validated['total_price'] - $downPayment;

        $booking = Booking::create([
            'booking_code'     => $bookingCode,
            'user_id'          => $request->user()->id,
            'lapangan_id'      => $validated['lapangan_id'],
            'date'             => $validated['date'],
            'start_time'       => $validated['start_time'],
            'end_time'         => $validated['end_time'],
            'duration'         => $validated['duration'],
            'total_price'      => $validated['total_price'],
            'down_payment'     => $downPayment,
            'remaining_payment' => $remainingPayment,
            'payment_status'   => 'Menunggu Verifikasi DP',
            'booking_status'   => 'Pending',
        ]);

        return response()->json($booking->load(['lapangan', 'user']), 201);
    }

    public function verifyPayment(Request $request, $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'action' => 'required|in:approve,reject',
        ]);

        if ($validated['action'] === 'approve') {
            $booking->update([
                'payment_status' => 'DP Sudah Dibayar',
                'booking_status' => 'Dikonfirmasi',
                'income_received' => $booking->down_payment,
            ]);
            $message = 'Booking dikonfirmasi, DP berhasil diverifikasi.';
        } else {
            $booking->update([
                'payment_status' => 'Ditolak',
                'booking_status' => 'Pending',
            ]);
            $message = 'Booking ditolak.';
        }

        return response()->json(['message' => $message, 'booking' => $booking]);
    }

    public function jadwal(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
        ]);

        $bookings = Booking::where('date', $validated['date'])
            ->where('booking_status', '!=', 'Dibatalkan')
            ->with(['lapangan', 'user'])
            ->get();

        return response()->json($bookings);
    }
}
