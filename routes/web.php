<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/producto', function () {
    //llamar la vista 
    return view('producto');
});

Route::get('/cliente', function () {
    return view('cliente');
});

Route::get('/inventario', function () {
    return view('inventario');
});

Route::get('/pedido', function () {
    return view('pedido');
});

Route::get('/grafica', function () {
    return view('grafica');
});