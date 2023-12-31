<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MyOrderController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ShopCardController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::post('user/register', [AuthController::class, 'register']);
Route::post('user/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
   

    Route::get('product/get/clothes', [ProductsController::class, 'getClothes']);
    Route::get('product/get/furniture', [ProductsController::class, 'getFurniture']);
    
    Route::get('/product/{product}', [ProductsController::class, 'show']);

    Route::get('auth/user', [AuthController::class, 'user']);

    Route::get('product/get/devices', [ProductsController::class, 'getDevicess']);
    
    Route::get('order/show', [AuthController::class, 'shopCardIndex']);
    Route::delete('/shop-card/delete/{id}', [ShopCardController::class, 'destroy']);
    
    Route::post('order/add', [ShopCardController::class, 'store']);
    
    Route::post('/order/admin/add', [OrderController::class, 'store']);
    
    Route::delete('/order/admin/drop', [OrderController::class, 'destroy']);
    
    Route::post('/order/delete', [OrderController::class, 'delete']);
    Route::get('/products/viewByName/{product_name}/{product_marke}', [ProductsController::class, 'showByName']);
    Route::put('/user/update/{user}', [AuthController::class, 'updateUser']);
    
    Route::get('get/myorder', [MyOrderController::class, 'index']);

    Route::get('/get/all/products/unique', [ProductsController::class, 'getUniqueProductNames']);

});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/admin/update/{product}',[AdminController::class,'updateProduct']);
    
    Route::get('get/view/products/{id}', [AdminController::class, 'showProduct']);
    Route::delete('/delete/product/{id}', [AdminController::class, 'destroy']);
    
    Route::get('/get/all/users', [AuthController::class, 'index']);
    Route::delete('/delete/user/{id}', [AuthController::class, 'destroy']);
    
    Route::get('/get/users/orders',[OrderController::class, 'index']);
    Route::delete('/delete/users/orders/{id}',[OrderController::class, 'deleteOrder']);
    Route::post('product/add', [AdminController::class, 'store']);


    Route::get('/get/all/products', [ProductsController::class, 'index']);

    Route::post('admin/register', [AuthController::class, 'Adminregister']);


});


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/home/clothes', [ProductsController::class, 'getHomeClothes']);
    Route::get('/home/devices', [ProductsController::class, 'getHomeDevicess']);
    Route::get('/home/furniture', [ProductsController::class, 'getHomeFurniture']);
    Route::post('user/logout', [AuthController::class, 'logout']);

});
