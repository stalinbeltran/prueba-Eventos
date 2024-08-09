
import EventEmitter from "events";
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaNombre{
    private emisor:EventEmitter

    constructor(emisor:EventEmitter){
        this.emisor = emisor
    }


    ingresoNombre = async()=>{      //aquí realizamos todas las acciones asíncronas que se requieren para ingreso de nombre
        return this.ingresaNombres()
        .then(this.ingresaApellidos)
        .then(this.ingresaTitulo)
    }

    private ingresaApellidos = ()=> {
        return new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese sus apellidos:')
            },
            ()=>{
                console.log('-------guardamos sus apellidos')
            },
        ).ingresa()
    }

    private ingresaTitulo = ()=> {
        let ingresa = new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese su titulo:')
            },
            (msg)=>{
                console.log('-------guardamos sus titulo')
            },
        )
        return ingresa.ingresa()
    }


    private ingresaNombres = () => {
        let ingresa = new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese sus nombres:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus nombres')
            },
        )
        return ingresa.ingresa()
    }



}

export default IngresaNombre