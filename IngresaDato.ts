
import EventEmitter from "events";
import express from "express"
import {Conversacion, Mensaje } from "./conversacion";

class IngresaDato{
    emisor:EventEmitter
    before:Function
    after:Function

    constructor(emisor, before, after){
        this.emisor = emisor
        this.before = before
        this.after = after
    }

    resuelve = (before, after)=> {
        return new Promise((resolve, reject) => {
            before()
            this.emisor.on('msgrecibido', function receptor(msg){
                this.removeListener('msgrecibido', receptor)      //dejamos de esperar este evento
                after(msg)                               //realizamos la accioin con el msg
                resolve(0)                                                         //indicamos que podemos continuar con el sgte paso, sea cual sea
            })
        })

    }

    ingresa = ()=>{ return this.resuelve(this.before, this.after)}

}

export default IngresaDato