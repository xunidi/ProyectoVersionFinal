import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => (
    
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
            <Link className='navbar-brand' to="/producto">
                Productos
            </Link>
            
            <Link className='navbar-brand' to="/cliente">
                Clientes
            </Link>
            
            <Link className='navbar-brand' to="/inventario">
                Inventario
            </Link>
            
            <Link className='navbar-brand' to="/pedido">
                Pedidos
            </Link>

            <Link className='navbar-brand' to="/grafica">
                Gráfica
            </Link>
        </div>
        
  </nav>
)

export default Header