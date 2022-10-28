import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class TablaDoctores extends Component {

    //Creamos el state para modificar el status y recoger los doctores
    state = {
        doctores: [],
        status: false
    }

    //Al cargar el elemento, le aplicamos la funcion cargaDoctores
    componentDidMount = () => {
        this.cargaDoctores();
    }

    //Funcion para mostrar el map con los doctores del html
    cargaDoctores = () => {

        //Si contiene una prop llamada esp, se usara una request para el get de esa especialidad
        //Si no la contiene, se usara una request para el get de todos

        if (this.props.esp == undefined){
            var request = "api/Doctores";
        }else{
            var request = "api/Doctores/DoctoresEspecialidad/" + this.props.esp
        }
        
        //Preparamos url a enviar
        var url = Global.urlprueba + request

        //Hacemos llamada axios y le asignamos el setstate para asignar doctores a los datos recibidos, y el status como true
        axios.get(url).then(res=>{
            this.setState({
                doctores:res.data,
                status: true
            })
        })
    }

    //Funcion para actualizar la tabla cuando se hace una insercion
    componentDidUpdate = (oldProps) => {
        //Si las props recibidas son diferentes a las antiguas, se realiza cargaDoctores
        if (this.props.esp != oldProps.esp) {
            this.cargaDoctores();
        }
    }

    render() {
        return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Apellido</th>
                        <th>Especialidad</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.doctores.map((doctor,index) => {
                            return (<tr key={index}>
                                <td>{doctor.apellido}</td>
                                <td>{doctor.especialidad}</td>
                                <td>{doctor.salario}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
        )
    }
}
