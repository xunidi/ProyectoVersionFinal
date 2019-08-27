<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
Use Log;

class ControllerGrafica extends ApiController
{
    //
    public function get_all(){
      
        $grafica = "select titulo, sum(cantidad) as num from pedido 
        inner join producto p USING(id_producto) 
        group by p.id_producto asc;";
        $datos = DB::select($grafica);
        
         return $datos;
    }
}
