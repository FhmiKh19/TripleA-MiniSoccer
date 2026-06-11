<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// MIGRATION: database/migrations/[timestamp]_create_pembatalans_table.php
// Run: php artisan make:model Pembatalan -m

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pembatalans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('reason');
            $table->enum('status', [
                'Menunggu Konfirmasi',
                'Disetujui',
                'Ditolak'
            ])->default('Menunggu Konfirmasi');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pembatalans');
    }
};
