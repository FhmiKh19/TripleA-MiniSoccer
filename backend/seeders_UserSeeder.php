<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// Place in: database/seeders/UserSeeder.php
// Create with: php artisan make:seeder UserSeeder
// Run with: php artisan db:seed --class=UserSeeder

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::firstOrCreate(
            ['email' => 'ikhsan@triplea.com'],
            [
                'name'     => 'Ikhsan Admin',
                'password' => Hash::make('admin123'),
                'role'     => 'admin',
            ]
        );

        // Owner user
        User::firstOrCreate(
            ['email' => 'aji@triplea.com'],
            [
                'name'     => 'Aji Owner',
                'password' => Hash::make('owner123'),
                'role'     => 'owner',
            ]
        );

        // Customer user
        User::firstOrCreate(
            ['email' => 'fahmi@gmail.com'],
            [
                'name'     => 'Fahmi',
                'password' => Hash::make('user123'),
                'role'     => 'customer',
            ]
        );

        // Additional test customers
        User::firstOrCreate(
            ['email' => 'budi@gmail.com'],
            [
                'name'     => 'Budi',
                'password' => Hash::make('user123'),
                'role'     => 'customer',
            ]
        );

        User::firstOrCreate(
            ['email' => 'siti@gmail.com'],
            [
                'name'     => 'Siti',
                'password' => Hash::make('user123'),
                'role'     => 'customer',
            ]
        );
    }
}
