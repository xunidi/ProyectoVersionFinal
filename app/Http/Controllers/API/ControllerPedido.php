<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pedido;
use App\Inventario;
use Illuminate\Support\Facades\DB;
Use Log;

class ControllerPedido extends ApiController
{
    
    public function get_all()
    {
        $data = DB::table('pedido')->select('id_pedido','producto.id_producto','titulo','observaciones','cliente.id_cliente','nombre','pedido.cantidad as cant_pedido','pedido.fecha')
        //->join('inventario',"inventario.id_producto","=","pedido.id_producto")
        ->join('cliente',"cliente.id_cliente","=","pedido.id_cliente")
        ->join('producto',"producto.id_producto","=","pedido.id_producto")
        ->get();

       return $data;
       
    }

    // funcion de insertar
    public function create(Request $request){

        Pedido::insert([
          'id_producto' => $request->input('producto'),
          'id_cliente' => $request->input('cliente'),
          'cantidad' => $request->input('cantidad'),
          'observaciones' => $request->input('observaciones')
        ]);
      //$cantidad = 0;  
      // inserta los datos
        

        /*$existencia = DB::table('pedido')->select('sum(inventario.cantidad) as inventario','sum(pedido.cantidad) as pedido')
        ->join('inventario',"inventario.id_producto","=","pedido.id_producto")
        ->where('id_producto','=',$request->input('producto'))
        ->get();

        //$existencia = Inventario::where('id_producto',$request->input('id_producto'))->get();
        foreach ($existencia as $cantidad) {
          $cantidad = $cantidad->inventario - $cantidad->pedido;
        }
        $exi = $cantidad - $request->input('cantidad');
        dd($exi);
        die();*/
        // respesta de JSON
        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;
       
        return $response;
    }

    public function update(Request $request){

        // inserta los datos
        Pedido::where('id_pedido',$request->input('id_pedido'))->
        update([
          'id_producto' => $request->input('producto'),
          'id_cliente' => $request->input('cliente'),
          'cantidad' => $request->input('cantidad'),
          'observaciones' => $request->input('observaciones')
        ]);
  
        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;
  
        return $response;
  
    }
}
