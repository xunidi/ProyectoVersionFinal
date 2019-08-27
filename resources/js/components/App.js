import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Producto from './Producto'
import Cliente from './Cliente'
import Inventario from './Inventario'
import Pedido from './Pedido'
import Grafica from './Grafica'
//basename="/example/laravel-react/public"
class App extends Component {
  render () {
    return (
        <BrowserRouter >
      
          <div>
            <Header />
            <Switch>
              <Route path='/producto' component={Producto} />
              <Route path='/cliente' component={Cliente} />
              <Route path='/inventario' component={Inventario} />
              <Route path='/pedido' component={Pedido} />
              <Route path='/grafica' component={Grafica} />
            </Switch>
          </div>
        </BrowserRouter>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'))