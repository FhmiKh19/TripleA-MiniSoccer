<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LapanganController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PembatalanController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\StatistikController;
use Illuminate\Support\Facades\Route;

// ===== AUTH (publik) =====
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ===== PROTECTED ROUTES =====
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Lapangan — semua role bisa lihat, hanya admin yang bisa CRUD
    Route::get('/lapangan', [LapanganController::class, 'index']);
    Route::get('/lapangan/{id}', [LapanganController::class, 'show']);
    
    Route::middleware('role:admin')->group(function () {
        Route::post('/lapangan', [LapanganController::class, 'store']);
        Route::put('/lapangan/{id}', [LapanganController::class, 'update']);
        Route::delete('/lapangan/{id}', [LapanganController::class, 'destroy']);
        Route::patch('/lapangan/{id}/status', [LapanganController::class, 'updateStatus']);
    });

    // Booking
    Route::get('/booking', [BookingController::class, 'index']);           // customer: milik sendiri | admin: semua
    Route::post('/booking', [BookingController::class, 'store']);          // customer
    Route::get('/booking/{id}', [BookingController::class, 'show']);
    Route::patch('/booking/{id}/verify', [BookingController::class, 'verifyPayment']); // admin
    Route::get('/jadwal', [BookingController::class, 'jadwal']);           // admin: lihat jadwal berdasar tanggal

    // Pembatalan
    Route::post('/pembatalan', [PembatalanController::class, 'store']);           // customer: ajukan pembatalan
    Route::get('/pembatalan', [PembatalanController::class, 'index']);            // admin: lihat semua
    Route::patch('/pembatalan/{id}/konfirmasi', [PembatalanController::class, 'konfirmasi']); // admin

    // Payment
    Route::post('/payment/upload', [PaymentController::class, 'upload']);  // customer: upload bukti bayar

    // Statistik & Laporan (owner only)
    Route::middleware('role:owner')->group(function () {
        Route::get('/statistik', [StatistikController::class, 'index']);
        Route::get('/laporan', [StatistikController::class, 'laporan']);   // dengan filter tanggal
    });
});
