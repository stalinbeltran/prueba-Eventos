
import EventEmitter from "events";
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaNombre{
    private emisor:EventEmitter
    private nombreEvento:string
    private ingresaDato:IngresaDato

    constructor(emisor:EventEmitter, nombreEvento:string){
        this.emisor = emisor
        this.nombreEvento = nombreEvento
        this.ingresaDato = new IngresaDato(
            this.emisor,
            this.nombreEvento,
        )
    }


    ingresoNombre = async()=>{      //aquí realizamos todas las acciones asíncronas que se requieren para ingreso de nombre, en el orden deseado
        return this.ingresaNombres()
        .then(this.ingresaApellidos)
        .then(this.ingresaTitulo)
    }

    private ingresaApellidos = ()=> {
        return this.ingresaDato.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus apellidos:')
            },
            (msg)=>{
                console.log('-------guardamos sus apellidos: ' + msg.numero)
            }
        )
    }

    private ingresaTitulo = ()=> {
        return this.ingresaDato.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus titulo:')
            },
            (msg)=>{
                console.log('-------guardamos sus titulo: ' + msg.numero)
            }
        )
    }


    private ingresaNombres = () => {
        return this.ingresaDato.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus nombres:')
            },
            (msg)=>{
                console.log('-------guardamos sus nombres: ' + msg.numero)
            }
        )
    }



}

export default IngresaNombre