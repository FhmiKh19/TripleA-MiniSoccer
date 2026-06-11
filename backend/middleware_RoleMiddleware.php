<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

// Place in: app/Http/Middleware/RoleMiddleware.php
// Middleware untuk mengecek role user
// Gunakan: Route::middleware('role:admin,owner')->group(...)
// Atau dalam route: Route::middleware('role:admin')->post(...)

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user() || !in_array($request->user()->role, $roles)) {
            return response()->json(['message' => 'Akses ditolak. Role yang diizinkan: ' . implode(', ', $roles)], 403);
        }

        return $next($request);
    }
}
