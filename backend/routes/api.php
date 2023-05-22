<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\AuthLoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:sanctum')->group(function () {
});



// Route::get('/test_function', 'API\ApiController@test_function');
Route::post('/login', [AuthLoginController::class, 'login']);
Route::post('/logout', [AuthLoginController::class, 'logout']);
Route::post('/create_user', [AuthLoginController::class, 'createUser']);
Route::get('/get_news_feed', [ApiController::class, 'get_news_feed']);
Route::get('/autologin', [AuthLoginController::class, 'autoLogin']);
Route::post('/create_preferences', [ApiController::class, 'createPrefereces']);

