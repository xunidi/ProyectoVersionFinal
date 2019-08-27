<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('producto/list','API\ControllerProduct@get_all');
// crear producto
Route::post('producto/create','API\ControllerProduct@create');
// Actualizar producto
Route::post('producto/update','API\ControllerProduct@update');
// Eliminar producto
Route::post('producto/delete','API\ControllerProduct@delete');


Route::get('cliente/list','API\ControllerCliente@get_all');
// crear cliente
Route::post('cliente/create','API\ControllerCliente@create');
// Actualizar cliente
Route::post('cliente/update','API\ControllerCliente@update');
// Eliminar cliente
Route::post('cliente/delete','API\ControllerCliente@delete');

//listar inventario
Route::get('inventario/list','API\ControllerInventario@get_all');

// crear inventario
Route::post('inventario/create','API\ControllerInventario@create');

// Actualizar inventario
Route::post('inventario/update','API\ControllerInventario@update');

//listar pedido
Route::get('pedido/list','API\ControllerPedido@get_all');

// crear pedido
Route::post('pedido/create','API\ControllerPedido@create');

// Actualizar inventario
Route::post('pedido/update','API\ControllerPedido@update');

//grafica
Route::get('grafica/list','API\ControllerGrafica@get_all');