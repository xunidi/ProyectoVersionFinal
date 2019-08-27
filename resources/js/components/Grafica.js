import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import produce from 'immer/dist/immer';
import SimpleBarChart from './Chart/SimpleBarChart';


//const baseUrl = "http://localhost/example/laravel-react/public/";

const baseUrl = "http://localhost:8000/";

export default class Grafica extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        response:[],
        data:{
            headers:["titulo","num"],
            rows:{summary:[]}
        },
      }

    }

    componentDidMount(){
      this.loadDataGrafica()
    }

    loadDataGrafica(){
        axios.get(baseUrl+'api/grafica/list').then(response=>{
            this.setState({
              response:response.data
            })
            console.log('datos',response.data);
           
            let array = [];
            this.state.response.forEach((item, i) => {
                const element = {
                    name:item.titulo,
                    producto: item.titulo,
                    cantidad: item.num
                };
                array = array.concat(element);
            });
            console.log('array',array);
            const nextState = produce(this.state, (draft) => {
                draft.data.rows.summary = array;
            });
            this.setState(nextState);      

         }).catch(error=>{
           alert("Error "+error)
         })
      }

      render() {

        return (
          <div class="container">
                <br/>
                <h3>Grafica de productos pedidos</h3>
                <hr/>
                <br/>
                <div>
                <SimpleBarChart newData={this.state.data.rows.summary} 
                        label={"name"} llaves={"cantidad"} 
                        fill={["rgba(200,0,0,.3)", "rgba(0, 200, 0, .3)"]} 
                        alto={400} ancho={600} />
                </div>
                <hr/>
            </div>

            )

        }

}

/*if (document.getElementById('grafica')) {
    ReactDOM.render(<Grafica />, document.getElementById('grafica'));
}*/