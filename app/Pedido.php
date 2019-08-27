<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    // 
    protected $table='pedido';

    protected $primaryKey = 'id_pedido';

    protected $fillable=['id_producto', 'id_cliente','cantidad','observaciones','fecha'];

    public $timestamps = false;

    public function get_producto() {
        return $this->belongsTo('App\Producto','id_producto');
        
    }

    public function get_cliente() {
        return $this->belongsTo('App\Cliente','id_cliente');
        
    }
    
}
