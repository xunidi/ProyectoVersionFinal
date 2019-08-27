<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    //
    protected $table='producto';

    protected $fillable=['titulo', 'descripcion', 'precio'];

    // guardar sin created_at u updated_at
    public $timestamps = false;

    public function inventario() {
        return $this->hasMany('App\Inventario','id_producto');
    }

    public function get_pedido() {
        return $this->hasMany('App\Pedido','id_producto');
    }

}
