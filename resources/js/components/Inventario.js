import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://localhost:8000/";

export default class Inventario extends Component {
   
     constructor(props){
      // variables
      super(props);
      this.state = {
        inventario:[],
        productos:[],
        inventarioBackup:[],
        textBuscar:'',
        formIdinventario:'',
        formProducto:'',
        formDescripcion:'',
        formCantidad:'',
        idInventario:0,
        idProducto:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeProducto = this.handleChangeProducto.bind(this);
      this.handleChangeCant  = this.handleChangeCant.bind(this);

    }

    componentDidMount(){
      this.loadDataInventario()
      this.loadDataProductos()
    }

    loadDataInventario(){

      axios.get(baseUrl+'api/inventario/list').then(response=>{
          this.setState({
            inventario:response.data,
            inventarioBackup:response.data
          })
       }).catch(error=>{
         alert("Error "+error)
       })

    }

    loadDataProductos(){

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
      const data = this.state.inventarioBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataTitulo = item.titulo.toUpperCase()
          // variable de descripcion
          const itemDataDescp = item.descripcion.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataTitulo+" "+itemDataDescp
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({inventario:newData})

    }

     // campo de nombre
    handleChangeProducto(event) {
      this.setState({formProducto: event.target.value});
    }

    //campo de cantidad
    handleChangeCant(event) {
      this.setState({formCantidad: event.target.value});
    }

    render() {
        return (
          <div class="container-fluid">

            <br/>
            <h3>Inventario de productos</h3>
            <hr/>

            <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
            <br/>
            <button type="button" class="btn-sm btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
              Registrar inventario
            </button>

            <hr/>

            <table class="table table-bordered order-table ">
              <thead class="thead-light">
                <tr>
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
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
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de inventario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <input type="hidden" class="form-control" value={this.state.formIdinventario} />
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
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn-sm btn btn-secondary" data-dismiss="modal">Cancelar</button>

                    {
                      this.state.edit?
                      <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkInventario()}>Guardar</button>
                     }
                  </div>
                </div>
              </div>
            </div>
            </form>


          </div>
        );
    }

    showModalEdit(data){
    
      this.setState({
        formIdinventario:data.id_inventario,
        formProducto:data.id_producto,
        formCantidad: data.cantidad,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idInventario:0,
        formIdinventario:0,
        formProducto:"",
        formCantidad:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkInventario()
    {

      if(this.state.formProducto === "" || this.state.formCantidad === ""){
        return false;
      }

      const formData = new FormData()
      formData.append('producto',this.state.formProducto)
      formData.append('cantidad',this.state.formCantidad)

      axios.post(baseUrl+'api/inventario/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataInventario()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      if(this.state.formProducto === "" || this.state.formCantidad === ""){
        return false;
      }

      const formData = new FormData()
      formData.append('producto',this.state.formProducto)
      formData.append('cantidad',this.state.formCantidad)
      formData.append('id_inventario',this.state.formIdinventario)

      axios.post(baseUrl+'api/inventario/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataInventario()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){
        console.log('data',this.state.inventario);
        return this.state.inventario.map((data)=>{
            
          return(
            <tr>
              <td>{data.titulo}</td>
              <td>{data.descripcion}</td>
              <td>{data.cantidad}</td>
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
}

/*if (document.getElementById('inventario')) {
    ReactDOM.render(<Inventario />, document.getElementById('inventario'));
}*/