
import EventEmitter from "events";
import { Mensaje } from "./conversacion";

class IngresaDato{
    private emisor:EventEmitter
    private nombreEvento:string

    constructor(emisor:EventEmitter, nombreEvento:string){
        this.emisor = emisor
        this.nombreEvento = nombreEvento
    }

    private resuelve = (
        before: () => void, 
        after: (msg:Mensaje) => void
    )=> {
        let that = this
        return new Promise((resolve, reject) => {
            before()
            this.emisor.on(this.nombreEvento, function receptor(msg){
                this.removeListener(that.nombreEvento, receptor)      //dejamos de esperar este evento
                after(msg)                               //realizamos la accion con el msg
                resolve(0)                                                         //indicamos que podemos continuar con el sgte paso, sea cual sea
            })
        })

    }

    ingresa = (before: () => void, after: (msg:Mensaje) => void)=>{ return this.resuelve(before, after)}

}

export default IngresaDato