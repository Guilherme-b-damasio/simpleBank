<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('dashboard', 'dashboard/dashboard');

    Route::get('account', [ProfileController::class, 'show'])->name('show');
    Route::patch('dashboard/dashboard', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('dashboard/dashboard', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
