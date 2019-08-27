<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    // 
    protected $table='inventario';

    protected $primaryKey = 'id_inventario';

    protected $fillable=['id_producto', 'cantidad', 'fecha'];

    public $timestamps = false;


    public function producto() {
        return $this->hasMany('App\Producto','id_producto');
        
    }
    
}

