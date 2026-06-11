<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lapangans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // Indoor / Outdoor
            $table->text('description')->nullable();
            $table->json('facilities')->nullable(); // array fasilitas
            $table->string('image')->nullable();
            $table->enum('status', ['Tersedia', 'Tidak Tersedia'])->default('Tersedia');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lapangans');
    }
};
