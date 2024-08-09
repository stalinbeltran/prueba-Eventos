
import EventEmitter from "events";
import express from "express"
import {Conversacion, Mensaje } from "./conversacion";

class IngresaDato{
    private emisor:EventEmitter
    private before: () => void
    private after: (msg:Mensaje) => void

    constructor(emisor, before: () => void, after: (msg:Mensaje) => void){
        this.emisor = emisor
        this.before = before
        this.after = after
    }

    private resuelve = (
        before: () => void, 
        after: (msg:Mensaje) => void
    )=> {
        return new Promise((resolve, reject) => {
            before()
            this.emisor.on('msgrecibido', function receptor(msg){
                this.removeListener('msgrecibido', receptor)      //dejamos de esperar este evento
                after(msg)                               //realizamos la accion con el msg
                resolve(0)                                                         //indicamos que podemos continuar con el sgte paso, sea cual sea
            })
        })

    }

    ingresa = ()=>{ return this.resuelve(this.before, this.after)}

}

export default IngresaDato