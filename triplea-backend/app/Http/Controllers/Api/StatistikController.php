<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use Illuminate\Http\Request;

class StatistikController
{
    public function index()
    {
        // Total reservasi
        $totalReservasi = Booking::where('booking_status', '!=', 'Dibatalkan')->count();

        // Total pendapatan
        $totalPendapatan = Booking::where('payment_status', 'Lunas')
            ->sum('total_price');

        // Jam tersewa
        $jamTersewa = Booking::where('booking_status', '!=', 'Dibatalkan')
            ->sum('duration');

        // Lapangan paling populer
        $lapanganTerpopuler = Booking::selectRaw('lapangan_id, COUNT(*) as total')
            ->where('booking_status', '!=', 'Dibatalkan')
            ->groupBy('lapangan_id')
            ->orderByDesc('total')
            ->first();

        $lapanganName = $lapanganTerpopuler?->lapangan?->name ?? 'N/A';

        // Reservasi per bulan (12 bulan terakhir)
        $reservasiPerBulan = Booking::where('booking_status', '!=', 'Dibatalkan')
            ->selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get()
            ->map(function ($item) {
                return [
                    'bulan' => 'Bulan ' . $item->bulan,
                    'total' => $item->total,
                ];
            });

        return response()->json([
            'total_reservasi'       => $totalReservasi,
            'total_pendapatan'      => $totalPendapatan,
            'jam_tersewa'           => $jamTersewa,
            'lapangan_terpopuler'   => $lapanganName,
            'reservasi_per_bulan'   => $reservasiPerBulan,
        ]);
    }

    public function laporan(Request $request)
    {
        $validated = $request->validate([
            'start' => 'required|date',
            'end'   => 'required|date',
        ]);

        $bookings = Booking::whereBetween('created_at', [
            $validated['start'],
            $validated['end'],
        ])
        ->where('booking_status', '!=', 'Dibatalkan')
        ->with(['user', 'lapangan'])
        ->get();

        return response()->json([
            'periode'    => $validated['start'] . ' - ' . $validated['end'],
            'transaksi'  => $bookings,
            'total'      => $bookings->sum('total_price'),
        ]);
    }
}
