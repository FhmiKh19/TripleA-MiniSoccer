<?php

namespace Database\Seeders;

use App\Models\Lapangan;
use Illuminate\Database\Seeder;

class LapanganSeeder extends Seeder
{
    public function run(): void
    {
        $lapangans = [
            [
                'name'        => 'Lapangan A',
                'type'        => 'Outdoor',
                'status'      => 'Tersedia',
                'description' => 'Lapangan outdoor dengan area luas dan nyaman untuk pertandingan santai bersama teman.',
                'facilities'  => ['Rumput sintetis', 'Lampu malam', 'Parkir', 'Toilet', 'Bola'],
                'image'       => '/images/lapangan-a.jpg',
            ],
            [
                'name'        => 'Lapangan B',
                'type'        => 'Outdoor',
                'status'      => 'Tersedia',
                'description' => 'Lapangan outdoor dengan area luas dan nyaman untuk pertandingan santai bersama teman.',
                'facilities'  => ['Rumput sintetis', 'Lampu malam', 'Parkir', 'Toilet', 'Bola'],
                'image'       => '/images/lapangan-b.jpg',
            ],
        ];

        foreach ($lapangans as $lapangan) {
            Lapangan::firstOrCreate(['name' => $lapangan['name']], $lapangan);
        }
    }
}
