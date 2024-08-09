
import EventEmitter from "events";
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaTelefono{
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
    
    ingresaTelefono = ()=> {
        return this.ingresaDato.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus telefonos:')
            },
            (msg)=>{
                console.log('-------guardamos sus telefonos: ' + msg.numero)
            }
        )
    }

}

export default IngresaTelefono