import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//const baseUrl = "http://localhost/example/laravel-react/public/";

const baseUrl = "http://localhost:8000/";

export default class Cliente extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        cliente:[],
        clienteBackup:[],
        textBuscar:'',
        formNombre:'',
        formDomicilio:'',
        formTelefono:'',
        formEmail:'',
        idCliente:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeDom  = this.handleChangeDom.bind(this);
      this.handleChangeTel  = this.handleChangeTel.bind(this);
      this.handleChangeEmail  = this.handleChangeEmail.bind(this);

    }

    componentDidMount(){
      this.loadDataCliente();
      $("#exampleModalDelete").css('display','none');
      $("#formularioCliente").css('display','none');
    }

    loadDataCliente(){

      axios.get(baseUrl+'api/cliente/list').then(response=>{
          this.setState({
            cliente:response.data,
            clienteBackup:response.data
          })

          console.log('cliente',response.data);
       }).catch(error=>{
         alert("Error "+error)
       })

    }

    filter(event){

      console.log(event.target.value)
      // obtener datos de buscar
      var text = event.target.value
      // obtener datos de array
      const data = this.state.clienteBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataNombre = item.nombre.toUpperCase()
          // variable de descripcion
          const itemDataDom = item.domicilio.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataNombre+" "+itemDataDom
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({cliente:newData})

    }

    // campo de nombre
    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});
    }

    //campo de descripcion
    handleChangeDom(event) {
      this.setState({formDomicilio: event.target.value});
    }

    // campo de precio
    handleChangeTel(event) {
      this.setState({formTelefono: event.target.value});
    }

    // campo de cantidad
    handleChangeEmail(event) {
      this.setState({formEmail: event.target.value});
    }

    render() {
        return (
          <div class="container">

            <br/>
            <h3>Listado de Clientes</h3>
            <hr/>

            <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
            <br/>
            <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.showModalCreate()}>
              Registrar cliente
            </button>

            <hr/>


            <table class="table table-bordered order-table ">
              <thead class="thead-light">
                <tr>
                  <th>Nombre</th>
                  <th>Domicilio</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.listData()}
              </tbody>
            </table>

            <div class="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">

                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Esta seguro desea de eliminar este cliente?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn-sm btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>

              </div>
            </div>


            <form id="cliente">
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de cliente</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                     <label for="exampleInputEmail1">Nombre del cliente </label>
                     <input type="text" class="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Domicilio</label>
                     <textarea class="form-control" rows="3" value={this.state.formDomicilio} onChange={this.handleChangeDom}></textarea>
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Telefono</label>
                     <input type="number" class="form-control" value={this.state.formTelefono} onChange={this.handleChangeTel} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Email</label>
                     <input type="email" class="form-control" value={this.state.formEmail} onChange={this.handleChangeEmail} />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn-sm btn btn-secondary" data-dismiss="modal">Cancelar</button>

                    {
                      this.state.edit?
                      <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn-sm btn btn-primary" onClick={()=>this.sendNetworkCliente()}>Guardar</button>
                    }
                  </div>
                </div>
              </div>
            </div>
            </form>


          </div>
        );
    }

    showModalDelete(data){ 
      $("#exampleModalDelete").css('display','block');
      // id seleccionado para eliminar
      this.setState({ idCliente:data.id_cliente })
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      $("#cliente").css('display','block');
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idCliente:data.id_cliente,
        formNombre:data.nombre,
        formDomicilio:data.domicilio,
        formTelefono: data.telefono,
        formEmail: data.email,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      $("#cliente").css('display','block');
      this.setState({
        idCliente:0,
        formNombre:"",
        formDomicilio:"",
        formTelefono:"",
        formEmail:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkCliente()
    {

      if(this.state.formNombre === "" || this.state.formDomicilio === "" || this.state.formTelefono === "" || this.state.formEmail===""){
        return false;
      }

      const formData = new FormData()
      formData.append('nombre',this.state.formNombre)
      formData.append('domicilio',this.state.formDomicilio)
      formData.append('telefono',this.state.formTelefono)
      formData.append('email',this.state.formEmail)

      axios.post(baseUrl+'api/cliente/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataCliente()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id_cliente',this.state.idCliente)

      axios.post(baseUrl+'api/cliente/delete',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataCliente()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      if(this.state.formNombre === "" || this.state.formDomicilio === "" || this.state.formTelefono === "" || this.state.formEmail===""){
        return false;
      }

      const formData = new FormData()
      formData.append('id_cliente',this.state.idCliente)
      formData.append('nombre',this.state.formNombre)
      formData.append('domicilio',this.state.formDomicilio)
      formData.append('telefono',this.state.formTelefono)
      formData.append('email',this.state.formEmail)

      axios.post(baseUrl+'api/cliente/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataCliente()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){

      return this.state.cliente.map((data)=>{

        return(
          <tr>
            <td>{data.nombre}</td>
            <td>{data.domicilio}</td>
            <td>{data.telefono}</td>
            <td>{data.email}</td>
            <td>
              <button class="btn-sm btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
              </td>
              <td>
              <button class="btn-sm btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
            </td>
          </tr>
        )

      })

    }
}
/*
if (document.getElementById('cliente')) {
    ReactDOM.render(<Cliente />, document.getElementById('cliente'));
}
*/