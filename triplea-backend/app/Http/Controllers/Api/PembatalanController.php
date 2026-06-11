<?php

namespace App\Http\Controllers\Api;

use App\Models\Pembatalan;
use App\Models\Booking;
use Illuminate\Http\Request;

class PembatalanController
{
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak. Hanya admin yang bisa melihat pembatalan.'], 403);
        }

        $pembatalans = Pembatalan::where('status', 'Menunggu Konfirmasi')
            ->with(['booking.lapangan', 'booking.user', 'user'])
            ->get();

        return response()->json($pembatalans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'reason'     => 'required|string|min:10',
        ]);

        $booking = Booking::find($validated['booking_id']);

        // Check apakah user adalah pemilik booking
        if ($booking->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak. Anda hanya bisa membatalkan booking milik Anda.'], 403);
        }

        // Check apakah booking sudah dibatalkan atau selesai
        if (in_array($booking->booking_status, ['Dibatalkan', 'Selesai'])) {
            return response()->json(['message' => 'Booking tidak bisa dibatalkan.'], 400);
        }

        // Update booking status
        $booking->update(['booking_status' => 'Menunggu Konfirmasi Pembatalan']);

        // Buat pembatalan record
        $pembatalan = Pembatalan::create([
            'booking_id' => $validated['booking_id'],
            'user_id'    => $request->user()->id,
            'reason'     => $validated['reason'],
            'status'     => 'Menunggu Konfirmasi',
        ]);

        return response()->json($pembatalan->load(['booking', 'user']), 201);
    }

    public function konfirmasi(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak. Hanya admin yang bisa mengkonfirmasi pembatalan.'], 403);
        }

        $pembatalan = Pembatalan::find($id);
        if (!$pembatalan) {
            return response()->json(['message' => 'Pembatalan tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'action' => 'required|in:setujui,tolak',
        ]);

        if ($validated['action'] === 'setujui') {
            $pembatalan->update(['status' => 'Disetujui']);
            $pembatalan->booking->update(['booking_status' => 'Dibatalkan']);
            $message = 'Pembatalan disetujui.';
        } else {
            $pembatalan->update(['status' => 'Ditolak']);
            $pembatalan->booking->update(['booking_status' => 'Dikonfirmasi']);
            $message = 'Pembatalan ditolak.';
        }

        return response()->json(['message' => $message, 'pembatalan' => $pembatalan]);
    }
}
