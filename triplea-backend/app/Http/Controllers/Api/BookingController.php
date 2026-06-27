<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\Lapangan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController
{
    public function index(Request $request)
    {
        if ($request->user()->role === 'customer') {
            $bookings = $request->user()->bookings()->with(['lapangan', 'user'])->get();
        } elseif (in_array($request->user()->role, ['admin', 'owner'])) {
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
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak. Hanya admin yang bisa verifikasi pembayaran.'], 403);
        }

        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'action' => 'required|in:approve,reject,settle,complete',
        ]);

        if ($validated['action'] === 'approve') {
            $booking->update([
                'payment_status' => 'DP Sudah Dibayar',
                'booking_status' => 'Dikonfirmasi',
                'income_received' => $booking->down_payment,
            ]);
            $message = 'Booking dikonfirmasi, DP berhasil diverifikasi.';
        } elseif ($validated['action'] === 'settle') {
            $booking->update([
                'payment_status' => 'Lunas',
                'booking_status' => 'Dikonfirmasi',
                'income_received' => $booking->total_price,
            ]);
            $message = 'Pelunasan berhasil dicatat. Reservasi masih aktif hingga selesai bermain.';
        } elseif ($validated['action'] === 'complete') {
            $booking->update([
                'booking_status' => 'Selesai',
            ]);
            $message = 'Reservasi ditandai selesai.';
        } else {
            $booking->update([
                'payment_status' => 'Ditolak',
                'booking_status' => 'Pending',
            ]);
            $message = 'Booking ditolak.';
        }

        return response()->json(['message' => $message, 'booking' => $booking->load(['lapangan', 'user'])]);
    }

    public function extend(Request $request, $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking tidak ditemukan.'], 404);
        }

        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        if (!in_array($booking->booking_status, ['Dikonfirmasi', 'Pending'])) {
            return response()->json(['message' => 'Booking tidak bisa ditambah durasinya.'], 400);
        }

        $validated = $request->validate([
            'extra_hours'  => 'required|integer|min:1|max:5',
            'extra_price'  => 'required|integer|min:0',
        ]);

        $extraDP = $validated['extra_price'] / 2;
        $newDuration = $booking->duration + $validated['extra_hours'];
        $newTotal = $booking->total_price + $validated['extra_price'];
        $newDP = $booking->down_payment + $extraDP;
        $newRemaining = $newTotal - $newDP;

        $endHour = (int) substr($booking->end_time, 0, 2) + $validated['extra_hours'];
        $newEndTime = sprintf('%02d:00', $endHour % 24);

        $conflict = Booking::where('lapangan_id', $booking->lapangan_id)
            ->where('date', $booking->date)
            ->where('id', '!=', $booking->id)
            ->where('booking_status', '!=', 'Dibatalkan')
            ->where('start_time', '<', $newEndTime)
            ->where('end_time', '>', $booking->end_time)
            ->exists();

        if ($conflict) {
            return response()->json(['message' => 'Slot tambahan sudah terisi.'], 400);
        }

        $booking->update([
            'end_time'          => $newEndTime,
            'duration'          => $newDuration,
            'total_price'       => $newTotal,
            'down_payment'      => $newDP,
            'remaining_payment' => $newRemaining,
            'payment_status'    => 'Menunggu Verifikasi DP',
        ]);

        return response()->json([
            'message' => 'Durasi berhasil ditambahkan.',
            'booking' => $booking->load(['lapangan', 'user']),
        ]);
    }

    public function jadwal(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'owner'])) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

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
