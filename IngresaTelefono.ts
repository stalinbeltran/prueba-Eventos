
import EventEmitter from "events";
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaTelefono{
    private emisor:EventEmitter
    private nombreEvento:string

    constructor(emisor:EventEmitter, nombreEvento:string){
        this.emisor = emisor
        this.nombreEvento = nombreEvento
    }

    ingresaTelefono = ()=> {
        return new IngresaDato(
            this.emisor, 
            this.nombreEvento,
            ()=>{
                console.log('-------por favor ingrese sus telefonos:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus telefonos: ' + msg.numero)
            },
        ).ingresa()
    }

}

export default IngresaTelefono