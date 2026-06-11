<?php

namespace App\Http\Controllers\Api;

use App\Models\Lapangan;
use Illuminate\Http\Request;

class LapanganController
{
    public function index()
    {
        return response()->json(Lapangan::all());
    }

    public function show($id)
    {
        $lapangan = Lapangan::find($id);
        if (!$lapangan) {
            return response()->json(['message' => 'Lapangan tidak ditemukan.'], 404);
        }
        return response()->json($lapangan);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'type'         => 'required|string',
            'description'  => 'nullable|string',
            'facilities'   => 'nullable|array',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'       => 'nullable|in:Tersedia,Tidak Tersedia',
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('lapangan', 'public');
            $data['image'] = $path;
        }

        $lapangan = Lapangan::create($data);
        return response()->json($lapangan, 201);
    }

    public function update(Request $request, $id)
    {
        $lapangan = Lapangan::find($id);
        if (!$lapangan) {
            return response()->json(['message' => 'Lapangan tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'type'         => 'sometimes|string',
            'description'  => 'nullable|string',
            'facilities'   => 'nullable|array',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'       => 'nullable|in:Tersedia,Tidak Tersedia',
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('lapangan', 'public');
            $data['image'] = $path;
        }

        $lapangan->update($data);
        return response()->json($lapangan);
    }

    public function destroy($id)
    {
        $lapangan = Lapangan::find($id);
        if (!$lapangan) {
            return response()->json(['message' => 'Lapangan tidak ditemukan.'], 404);
        }

        // Check if ada booking aktif
        $activeBookings = $lapangan->bookings()
            ->whereIn('booking_status', ['Pending', 'Dikonfirmasi'])
            ->count();

        if ($activeBookings > 0) {
            // Jangan hapus, ubah status jadi Tidak Tersedia
            $lapangan->update(['status' => 'Tidak Tersedia']);
            return response()->json(['message' => 'Lapangan ada booking aktif, status diubah menjadi Tidak Tersedia.']);
        }

        $lapangan->delete();
        return response()->json(['message' => 'Lapangan berhasil dihapus.']);
    }

    public function updateStatus($id)
    {
        $lapangan = Lapangan::find($id);
        if (!$lapangan) {
            return response()->json(['message' => 'Lapangan tidak ditemukan.'], 404);
        }

        $newStatus = $lapangan->status === 'Tersedia' ? 'Tidak Tersedia' : 'Tersedia';
        $lapangan->update(['status' => $newStatus]);

        return response()->json(['message' => 'Status berhasil diubah.', 'lapangan' => $lapangan]);
    }
}
