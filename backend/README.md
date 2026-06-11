# Laravel Backend Scaffold for TripleA MiniSoccer

This folder contains **complete, ready-to-paste PHP files** for the Laravel API backend for the TripleA Mini Soccer Booking System.

## What's Inside

All the files needed to build the backend:

- ✅ **Migrations** (4 files): Add role to users, create lapangans, bookings, pembatalans tables
- ✅ **Models** (4 files): User, Lapangan, Booking, Pembatalan with relationships
- ✅ **Controllers** (6 files): Auth, Lapangan, Booking, Pembatalan, Payment, Statistik
- ✅ **Middleware**: RoleMiddleware for access control
- ✅ **Routes**: Complete API routes with role-based access
- ✅ **Seeder**: UserSeeder with test data (admin, owner, customers)
- ✅ **Setup Guide**: Detailed step-by-step instructions

## Quick Start

1. **Read the detailed guide**: Open `SETUP_GUIDE.md` for complete, step-by-step instructions
2. **Copy files**: Each file in this folder maps to a specific Laravel location (see `SETUP_GUIDE.md`)
3. **Run migrations & seeder**: `php artisan migrate --seed`
4. **Start server**: `php artisan serve --port=8000`

## File Mapping

| Backend File | Laravel Location |
|---|---|
| 01_AddRoleToUsers.php | database/migrations/[timestamp]_add_role_to_users_table.php |
| 02_CreateLapangansTable.php | database/migrations/[timestamp]_create_lapangans_table.php |
| 03_CreateBookingsTable.php | database/migrations/[timestamp]_create_bookings_table.php |
| 04_CreatePembatalansTable.php | database/migrations/[timestamp]_create_pembatalans_table.php |
| models_User.php | app/Models/User.php |
| models_Lapangan.php | app/Models/Lapangan.php |
| models_Booking.php | app/Models/Booking.php |
| models_Pembatalan.php | app/Models/Pembatalan.php |
| middleware_RoleMiddleware.php | app/Http/Middleware/RoleMiddleware.php |
| controllers_AuthController.php | app/Http/Controllers/Api/AuthController.php |
| controllers_LapanganController.php | app/Http/Controllers/Api/LapanganController.php |
| controllers_BookingController.php | app/Http/Controllers/Api/BookingController.php |
| controllers_PembatalanController.php | app/Http/Controllers/Api/PembatalanController.php |
| controllers_PaymentController.php | app/Http/Controllers/Api/PaymentController.php |
| controllers_StatistikController.php | app/Http/Controllers/Api/StatistikController.php |
| seeders_UserSeeder.php | database/seeders/UserSeeder.php |
| routes_api.php | routes/api.php |

## Features Implemented

✅ **Auth**: Login, Register, Logout, Get Current User  
✅ **Lapangan (Fields)**: CRUD, Status toggle, Prevent deletion if has active bookings  
✅ **Booking**: Create, List, Verify payment, View schedule by date  
✅ **Pembatalan (Cancellation)**: Request, List, Confirm/Reject  
✅ **Payment**: Upload proof image  
✅ **Statistik**: Revenue, reservations, popular fields, monthly report  
✅ **Role-Based Access**: Admin, Owner, Customer permissions  
✅ **File Upload**: Images for fields & payment proofs with public storage  

## Prerequisites

- PHP 8.1+
- Composer
- MySQL (Laragon recommended)
- Laravel 10+

## System Requirements Met

✅ Frontend already updated to use API (`AuthContext.jsx`, `AppDataContext.jsx`, `src/services/api.js`)  
✅ CORS configured in frontend `.env`  
✅ Token-based auth (Sanctum)  
✅ All CRUD operations with role-based access control  
✅ File uploads for fields & payment proofs  

See **SETUP_GUIDE.md** for the complete step-by-step walkthrough.
