
import EventEmitter from "events";
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaTelefono{
    private emisor:EventEmitter

    constructor(emisor:EventEmitter){
        this.emisor = emisor
    }

    ingresaTelefono = ()=> {
        return new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese sus telefonos:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus telefonos')
            },
        ).ingresa()
    }

}

export default IngresaTelefono