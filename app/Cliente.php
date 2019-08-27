<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    // 
    protected $table='cliente';

    protected $fillable=['nombre', 'domicilio', 'telefono', 'email' ];

    // guardar sin created_at u updated_at
    public $timestamps = false;

    public function get_pedido() {
        return $this->hasMany('App\Pedido','id_cliente');
        
    }
}
