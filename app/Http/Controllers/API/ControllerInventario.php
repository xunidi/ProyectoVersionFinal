<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Inventario as Inventario;
use Illuminate\Support\Facades\DB;
Use Log;

class ControllerInventario extends ApiController
{
    
    public function get_all()
    {
       return $data = DB::table('inventario')->select('id_inventario','producto.id_producto','titulo', 'descripcion','cantidad','fecha')
        ->join('producto',"inventario.id_producto","=","producto.id_producto")
           ->get();

        
      
    }

    // funcion de insertar
    public function create(Request $request){

        // inserta los datos
        Inventario::insert([
          'id_producto' => $request->input('producto'),
          'cantidad' => $request->input('cantidad')
        ]);
  
        // respesta de JSON
        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;
  
        return $response;
    }

    public function update(Request $request){

        // inserta los datos
        Inventario::where('id_inventario',$request->input('id_inventario'))->
        update([
          'id_producto' => $request->input('producto'),
          'cantidad' => $request->input('cantidad'),
        ]);
  
        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;
  
        return $response;
  
      }
}
