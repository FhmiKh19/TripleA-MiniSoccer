<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique(); // TRPA-001, dll
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('lapangan_id')->constrained('lapangans')->onDelete('cascade');
            $table->date('date');
            $table->string('start_time');
            $table->string('end_time');
            $table->integer('duration'); // dalam jam
            $table->bigInteger('total_price');
            $table->bigInteger('down_payment');
            $table->bigInteger('remaining_payment');
            $table->bigInteger('income_received')->default(0);
            $table->enum('payment_status', [
                'Menunggu Verifikasi DP',
                'DP Sudah Dibayar',
                'Lunas',
                'Ditolak'
            ])->default('Menunggu Verifikasi DP');
            $table->enum('booking_status', [
                'Pending',
                'Dikonfirmasi',
                'Selesai',
                'Dibatalkan',
                'Menunggu Konfirmasi Pembatalan'
            ])->default('Pending');
            $table->string('payment_proof')->nullable(); // path foto bukti bayar
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
