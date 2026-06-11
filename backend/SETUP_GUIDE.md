# Setup Lengkap Laravel Backend untuk TripleA MiniSoccer

Panduan ini menjelaskan langkah demi langkah cara setup backend Laravel dengan semua file yang sudah disiapkan.

## Step 1: Buat Project Laravel

```bash
composer create-project laravel/laravel triplea-backend
cd triplea-backend
```

## Step 2: Install & Setup Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

## Step 3: Konfigurasi CORS & Environment

### 3.1 Update `.env`

```
APP_NAME=TripleA
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=triplea_minisoccer
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### 3.2 Update `config/cors.php`

Buka `config/cors.php` dan ubah return statement menjadi:

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 3.3 Update `config/sanctum.php`

Cari line yang berisi `'stateful'` dan ubah menjadi:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:5173')),
```

### 3.4 Update `app/Http/Kernel.php`

Di dalam `$middlewareGroups` array, cari `'api'` dan pastikan seperti ini:

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

Juga tambahkan di `$routeMiddleware` array:

```php
'role' => \App\Http\Middleware\RoleMiddleware::class,
```

## Step 4: Tambahkan File Migrations

Copy isi dari file-file berikut ke Laravel project:

- `01_AddRoleToUsers.php` → `database/migrations/[timestamp]_add_role_to_users_table.php`
- `02_CreateLapangansTable.php` → `database/migrations/[timestamp]_create_lapangans_table.php`
- `03_CreateBookingsTable.php` → `database/migrations/[timestamp]_create_bookings_table.php`
- `04_CreatePembatalansTable.php` → `database/migrations/[timestamp]_create_pembatalans_table.php`

## Step 5: Tambahkan Models

Copy isi dari file-file berikut ke Laravel project:

- `models_User.php` → `app/Models/User.php` (update/ganti file yang sudah ada)
- `models_Lapangan.php` → `app/Models/Lapangan.php`
- `models_Booking.php` → `app/Models/Booking.php`
- `models_Pembatalan.php` → `app/Models/Pembatalan.php`

## Step 6: Tambahkan Middleware

Copy isi dari file berikut ke Laravel project:

- `middleware_RoleMiddleware.php` → `app/Http/Middleware/RoleMiddleware.php`

## Step 7: Tambahkan Controllers

Copy isi dari file-file berikut ke Laravel project:

- `controllers_AuthController.php` → `app/Http/Controllers/Api/AuthController.php`
- `controllers_LapanganController.php` → `app/Http/Controllers/Api/LapanganController.php`
- `controllers_BookingController.php` → `app/Http/Controllers/Api/BookingController.php`
- `controllers_PembatalanController.php` → `app/Http/Controllers/Api/PembatalanController.php`
- `controllers_PaymentController.php` → `app/Http/Controllers/Api/PaymentController.php`
- `controllers_StatistikController.php` → `app/Http/Controllers/Api/StatistikController.php`

Pastikan folder `app/Http/Controllers/Api` sudah ada. Jika belum, buat manual.

## Step 8: Tambahkan Seeder

Copy isi dari file berikut ke Laravel project:

- `seeders_UserSeeder.php` → `database/seeders/UserSeeder.php`

Juga update `database/seeders/DatabaseSeeder.php`:

```php
public function run(): void
{
    $this->call([
        UserSeeder::class,
    ]);
}
```

## Step 9: Update Routes

Copy isi dari file berikut ke Laravel project:

- `routes_api.php` → `routes/api.php` (ganti seluruh isinya)

## Step 10: Run Migrations & Seeders

```bash
php artisan migrate --seed
```

## Step 11: Link Storage (untuk upload file)

```bash
php artisan storage:link
```

## Step 12: Run Laravel Server

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Backend akan berjalan di `http://localhost:8000`

---

## Test API dengan Postman/Thunder Client

### 1. Login
```
POST http://localhost:8000/api/login
Body (JSON):
{
  "email": "fahmi@gmail.com",
  "password": "user123"
}
```

Response akan memberikan token yang digunakan untuk request berikutnya.

### 2. Get Lapangan (dengan token)
```
GET http://localhost:8000/api/lapangan
Header: Authorization: Bearer [token]
```

### 3. Create Booking
```
POST http://localhost:8000/api/booking
Header: Authorization: Bearer [token]
Body (JSON):
{
  "lapangan_id": 1,
  "date": "2026-06-15",
  "start_time": "09:00",
  "end_time": "11:00",
  "duration": 2,
  "total_price": 500000
}
```

---

## User Seeding

Seeder sudah membuat 5 user yang bisa digunakan untuk test:

| Email | Password | Role |
|-------|----------|------|
| ikhsan@triplea.com | admin123 | admin |
| aji@triplea.com | owner123 | owner |
| fahmi@gmail.com | user123 | customer |
| budi@gmail.com | user123 | customer |
| siti@gmail.com | user123 | customer |

---

## Troubleshooting

### CORS Error
- Pastikan `config/cors.php` sudah benar
- Restart Laravel server setelah ubah `.env`

### Authentication Error (Unauthorized)
- Pastikan token sudah diinclude di header `Authorization: Bearer [token]`

### File Upload Error
- Pastikan sudah jalankan `php artisan storage:link`
- Folder `storage/app/public` sudah ada

### Middleware Role Error
- Pastikan `RoleMiddleware` sudah didaftarkan di `app/Http/Kernel.php`
- Cek user `role` di database tabelnya ada

---

## Struktur Database

```
users
├── id
├── name
├── email
├── password
├── role (customer|admin|owner)
├── email_verified_at
├── created_at
└── updated_at

lapangans
├── id
├── name
├── type
├── description
├── facilities (JSON)
├── image
├── status (Tersedia|Tidak Tersedia)
├── created_at
└── updated_at

bookings
├── id
├── booking_code (unique)
├── user_id (FK)
├── lapangan_id (FK)
├── date
├── start_time
├── end_time
├── duration
├── total_price
├── down_payment
├── remaining_payment
├── income_received
├── payment_status
├── booking_status
├── payment_proof
├── created_at
└── updated_at

pembatalans
├── id
├── booking_id (FK)
├── user_id (FK)
├── reason
├── status (Menunggu Konfirmasi|Disetujui|Ditolak)
├── created_at
└── updated_at
```

---

## Endpoint API Summary

| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| POST | /api/login | ✗ | - | Login |
| POST | /api/register | ✗ | - | Register |
| POST | /api/logout | ✓ | - | Logout |
| GET | /api/me | ✓ | - | Get current user |
| GET | /api/lapangan | ✓ | - | List lapangan |
| GET | /api/lapangan/{id} | ✓ | - | Detail lapangan |
| POST | /api/lapangan | ✓ | admin | Create lapangan |
| PUT | /api/lapangan/{id} | ✓ | admin | Update lapangan |
| DELETE | /api/lapangan/{id} | ✓ | admin | Delete lapangan |
| PATCH | /api/lapangan/{id}/status | ✓ | admin | Toggle status |
| GET | /api/booking | ✓ | - | List booking (customer: milik sendiri, admin: semua) |
| GET | /api/booking/{id} | ✓ | - | Detail booking |
| POST | /api/booking | ✓ | customer | Create booking |
| PATCH | /api/booking/{id}/verify | ✓ | admin | Verify payment |
| GET | /api/jadwal | ✓ | - | Get jadwal by date |
| POST | /api/pembatalan | ✓ | customer | Request cancellation |
| GET | /api/pembatalan | ✓ | admin | List cancellations |
| PATCH | /api/pembatalan/{id}/konfirmasi | ✓ | admin | Confirm/reject cancellation |
| POST | /api/payment/upload | ✓ | customer | Upload payment proof |
| GET | /api/statistik | ✓ | owner | Get statistics |
| GET | /api/laporan | ✓ | owner | Get report (with date filter) |

---

## Next Steps

Setelah backend selesai, frontend sudah siap menerima API calls karena sudah update `AuthContext.jsx`, `AppDataContext.jsx`, dan `src/services/api.js`.

Tinggal test end-to-end flow:
1. Login dari frontend → Token disimpan
2. Get lapangan dari API
3. Create booking
4. Verify payment
5. Request cancellation
6. Etc.
