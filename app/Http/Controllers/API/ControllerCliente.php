<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cliente;
use App\Pedido;
use Illuminate\Support\Facades\DB;
Use Log;

class ControllerCliente extends Controller
{
    //
     //
     public function get_all(){
          //return Cliente::all();
          $data = DB::table('cliente')->select('id_cliente','nombre','domicilio','telefono','email')
          ->get();
          return $data;
      }
  
      // funcion de insertar
      public function create(Request $request){
  
        // inserta los datos
        Cliente::insert([
          'nombre' => $request->input('nombre'),
          'domicilio' => $request->input('domicilio'),
          'telefono' => $request->input('telefono'),
          'email' => $request->input('email')
        ]);
  
        // respesta de JSON
        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;
  
        return $response;
      }
  
      public function update(Request $request){
  
        // inserta los datos
        Cliente::where('id_cliente',$request->input('id_cliente'))->
        update([
            'nombre' => $request->input('nombre'),
            'domicilio' => $request->input('domicilio'),
            'telefono' => $request->input('telefono'),
            'email' => $request->input('email')
        ]);
  
        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;
  
        return $response;
  
      }
  
      public function delete(Request $request){
  
        //consultamos si tiene pedido
        $pedido = Pedido::where('id_cliente',$request->input('id_cliente'))->get();

        if(count($pedido)===0){
          // Eliminar
          Cliente::where('id_cliente',$request->input('id_cliente'))->delete();
          // respesta de JSON
          $response['message'] = "Elimino exitosamente";
          $response['success'] = true;

        } else {
          $response['message'] = "El cliente que desea eliminar ya realizó un pedido, no es posible llevar a cabo la operación";
          $response['success'] = true;
        }
  
        return $response;
      }
}
