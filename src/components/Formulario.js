import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import TablaDoctores from './TablaDoctores';

export default class Formulario extends Component {

    //Se crean las referencias del input y del select
    valorSelect = React.createRef();
    valorInput = React.createRef();

    //Se crea el state de las especialidades y los los status del get y del push
    //En el html se comparan para saber que tabladoctores se muestra
    state = {
        especialidades: [],
        statusGet: false,
        statusPut: false
    }

    //Al cargar la pagina, mostramos los datos del select
    componentDidMount = () => {
        this.selectEspecialidad();
    }

    //Funcion para recoger las options que tendra el select, mirar map del index
    selectEspecialidad = () => {

        //Preparamos request y url para la solicitud
        var request = "api/Doctores/Especialidades";
        var url = Global.urlprueba + request;

        //Hacemos llamada axios y asignamos el status del get como true y recogemos las especialidades
        axios.get(url).then(res => {
            
            
            this.setState({
                statusGet: true,
                especialidades: res.data
            })
            
        })

        
    }

    //Funcion para aplicar el incremento una vez enviado el form
    aplicaIncremento = (e) => {

        //Se anula el evento
        e.preventDefault();

        //Se prepara la url para la solicitud axios
        var request = "api/Doctores/" + this.valorSelect.current.value + "/" + this.valorInput.current.value;

        var url = Global.urlprueba + request;

        //Como no nos pide enviar ningun objeto, segun la api, enviamos solo la url y asignamos el statusPut como true si entra
        axios.put(url).then(res => {
            
            this.setState({
                statusPut: true
            });

        })


    }

    render() {
        return (
        <div>
            <h1>Incremento Salarial Doctores</h1>
            <form onSubmit={this.aplicaIncremento}>
                <label>Seleccione una especialidad: </label>
                <select ref={this.valorSelect}>
                    {
                        this.state.especialidades.map((especialidad, index) => {
                            return (<option key={index}>{especialidad}</option>)
                        })
                    }
                </select>
                <br/><br/>
                <label>Indique el incremento: </label>
                <input type="text" ref={this.valorInput}/>
                <button>Incrementar salario</button>
            </form>
            <br/>
            {/*Si no se realiza el put, no se pasara ningun param*/}
            {/*Si se realiza el put, se pasara el param esp para saber que tabla se mostrara -> Mirar TablaDoctores.js*/}
            {
                this.state.statusPut == false && 
                <TablaDoctores/>
            }
            {
                this.state.statusPut == true && 
                <TablaDoctores esp={this.valorSelect.current.value}/>
            }
            
        </div>
        )
    }
}
