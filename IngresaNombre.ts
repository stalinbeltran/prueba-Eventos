
import EventEmitter from "events";
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaNombre{
    private emisor:EventEmitter
    nombreEvento:string

    constructor(emisor:EventEmitter, nombreEvento:string){
        this.emisor = emisor
        this.nombreEvento = nombreEvento
    }


    ingresoNombre = async()=>{      //aquí realizamos todas las acciones asíncronas que se requieren para ingreso de nombre, en el orden deseado
        return this.ingresaNombres()
        .then(this.ingresaApellidos)
        .then(this.ingresaTitulo)
    }

    private ingresaApellidos = ()=> {
        return new IngresaDato(
            this.emisor,
            this.nombreEvento,
            ()=>{
                console.log('-------por favor ingrese sus apellidos:')
            },
            (msg)=>{
                console.log('-------guardamos sus apellidos: ' + msg.numero)
            },
        ).ingresa()
    }

    private ingresaTitulo = ()=> {
        return new IngresaDato(
            this.emisor, 
            this.nombreEvento,
            ()=>{
                console.log('-------por favor ingrese su titulo:')
            },
            (msg)=>{
                console.log('-------guardamos sus titulo: ' + msg.numero)
            },
        ).ingresa()
    }


    private ingresaNombres = () => {
        return new IngresaDato(
            this.emisor, 
            this.nombreEvento,
            ()=>{
                console.log('-------por favor ingrese sus nombres:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus nombres: ' + msg.numero)
            },
        ).ingresa()
    }



}

export default IngresaNombre