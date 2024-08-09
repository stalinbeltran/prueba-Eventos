
import EventEmitter from "events";
import express from "express"
import {Conversacion, Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

const app = express()
const port = 4000

class IngresaTelefono{
    private emisor:EventEmitter

    constructor(emisor:EventEmitter){
        this.emisor = emisor
    }


    ingreso = async()=>{      //aquí realizamos todas las acciones asíncronas que se requieren para ingreso de nombre
        return this.ingresaTelefono()
    }

    private ingresaTelefono = ()=> {
        return new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese sus telefonos:')
            },
            ()=>{
                console.log();
                console.log('-------guardamos sus telefonos')
            },
        ).ingresa()
    }

}

export default IngresaTelefono