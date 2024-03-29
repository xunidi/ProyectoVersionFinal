import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//const baseUrl = "http://localhost/example/laravel-react/public/";

const baseUrl = "http://localhost:8000/";

export default class Pedido extends Component {
   
     constructor(props){
      // variables
      super(props);
      this.state = {
        clientes:[],
        productos:[],
        pedido:[],
        pedidoBackup:[],
        textBuscar:'',
        formIdpedido:'',
        formProducto:'',
        formCliente:'',
        formCantidad:'',
        formObservaciones:'',
        idPedido:0,
        idProducto:0,
        idCliente:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
     this.handleChangeCliente = this.handleChangeCliente.bind(this);
      this.handleChangeProducto = this.handleChangeProducto.bind(this);
      this.handleChangeObs  = this.handleChangeObs.bind(this);
      this.handleChangeCant  = this.handleChangeCant.bind(this);

    }

    componentDidMount(){
      this.loadDataPedido()
      
    }

    loadDataPedido(){

      axios.get(baseUrl+'api/pedido/list').then(response=>{
          this.setState({
            pedido:response.data,
            pedidoBackup:response.data
          })
         // console.log('respuesta',response);
       }).catch(error=>{
         alert("Error "+error)
       })

       axios.get(baseUrl+'api/cliente/list').then(response=>{
          this.setState({
            clientes:response.data,
          })
      }).catch(error=>{
        alert("Error "+error)
      })

      axios.get(baseUrl+'api/producto/list').then(response=>{
        this.setState({
          productos:response.data,
        })
     }).catch(error=>{
       alert("Error "+error)
     })

    }

    filter(event){

      console.log(event.target.value)
      // obtener datos de buscar
      var text = event.target.value
      // obtener datos de array
      const data = this.state.pedidoBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataTitulo = item.titulo.toUpperCase()
          // variable de descripcion
          const itemDataNombre = item.nombre.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataTitulo+" "+itemDataNombre
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({pedido:newData})

    }

     // campo de nombre
     handleChangeProducto(event) {
      this.setState({formProducto: event.target.value});
    }

    handleChangeCliente(event) {
      this.setState({formCliente: event.target.value});
    }

    //campo de cantidad
    handleChangeCant(event) {
      this.setState({formCantidad: event.target.value});
    }

    handleChangeObs(event) {
      this.setState({formObservaciones: event.target.value});
    }

    render() {
        
      return (
        <div class="container">

          <br/>
          <h3>Pedidos</h3>
          <hr/>

          <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
          <br/>
          <button type="button" class="btn-sm btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
            Registrar pedido
          </button>

          <hr/>

          <table class="table table-bordered order-table ">
            <thead class="thead-light">
              <tr>
                <th>Id Pedido</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody id="bodytable">
                {this.listData()}
            </tbody>
          </table>
          

          <form>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Formulario de pedido</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                {
                  this.state.edit?
                  <div class="form-group">
                   <label for="exampleInputEmail1">Id Pedido </label>
                   <input type="number" disabled="disabled" class="form-control" value={this.state.formIdpedido} />
                  </div>:''
                }
                 
                  <div class="form-group">
                   <label for="exampleInputEmail1">Cliente </label>
                   <select class="form-control" name="cliente" id="cliente" onChange={this.handleChangeCliente}>
                   <option value="">Selecciona una opción de la lista</option>
                     {this.renderClientes()}
                    </select>
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Producto </label>
                   <select class="form-control" name="producto" id="producto" onChange={this.handleChangeProducto}>
                   <option value="">Selecciona una opción de la lista</option>
                     {this.renderProductos()}
                    </select>
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Cantidad</label>
                   <input type="number" class="form-control" value={this.state.formCantidad} onChange={this.handleChangeCant} />
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Observaciones</label>
                   <textarea type="text" class="form-control" value={this.state.formObservaciones} onChange={this.handleChangeObs} />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn-sm btn btn-secondary" data-dismiss="modal">Cancelar</button>

                  {
                    this.state.edit?
                    <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                    :
                    <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkPedido()}>Guardar</button>
                   }
                </div>
              </div>
            </div>
          </div>
          </form>
        </div>
      )
    }

    showModalEdit(data){
    
      this.setState({
        formIdpedido:data.id_pedido,
        formCliente:data.id_cliente,
        formProducto:data.id_producto,
        formCantidad: data.cant_pedido,
        formObservaciones: data.observaciones,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idPedido:0,
        formIdpedido:"",
        formCliente:"",
        formProducto:"",
        formObservaciones:"",
        formCantidad:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkPedido()
    {
      if(this.state.formProducto==="" || this.state.formCliente==="" || this.state.formCantidad==="" || this.state.formObservaciones===""){
        return false;
      }
      const formData = new FormData()
      formData.append('producto',this.state.formProducto)
      formData.append('cliente',this.state.formCliente)
      formData.append('cantidad',this.state.formCantidad)
      formData.append('observaciones',this.state.formObservaciones)

      axios.post(baseUrl+'api/pedido/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataPedido()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      if(this.state.formProducto==="" || this.state.formCliente==="" || this.state.formCantidad==="" || this.state.formObservaciones===""){
        return false;
      }

      const formData = new FormData()
      formData.append('producto',this.state.formProducto)
      formData.append('cliente',this.state.formCliente)
      formData.append('cantidad',this.state.formCantidad)
      formData.append('observaciones',this.state.formObservaciones)
      formData.append('id_pedido',this.state.formIdpedido)

      axios.post(baseUrl+'api/pedido/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataPedido()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){
       
        return this.state.pedido.map((data)=>{
          return(
            <tr>
              <td>{data.id_pedido}</td>
              <td>{data.nombre}</td>
              <td>{data.titulo}</td>
              <td>{data.cant_pedido}</td>
              <td>{data.fecha}</td>
              <td>
              <button class="btn-sm btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
              
              {/*<button class="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>*/}
            </td>
            </tr>
          )
  
        })
  
      }

      renderProductos(){
       
        const {formProducto} = this.state;

        return this.state.productos.map((data)=>{ 
          return(
            <option value={data.id_producto} selected = {data.id_producto === formProducto ? "selected":''}>{data.titulo}</option>
            
          )
        })
  
      }

      renderClientes(){
       
        const {formCliente} = this.state;

        return this.state.clientes.map((data)=>{ 
          return(
            <option value={data.id_cliente} selected = {data.id_cliente === formCliente ? "selected":''}>{data.nombre}</option>
            
          )
        })
  
      }

}

/*
if (document.getElementById('pedido')) {
    ReactDOM.render(<Pedido />, document.getElementById('pedido'));
}*/