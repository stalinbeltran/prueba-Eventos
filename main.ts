
import EventEmitter from "events";
import express from "express"
import {Conversacion, Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

const app = express()
const port = 4000

class Demo{
    contador = 0
    emisor:EventEmitter
    status:string


    constructor(){
        const myEmitter = new EventEmitter();
        this.emisor = myEmitter

        app.get('/msgrecibido', async (req, res) => {
            let msg = new Mensaje
            msg.msg = req.query.msg
            msg.numero = req.query.numero
            msg.telefonoCliente = req.query.telefonocliente
            res.send('hemos recibido el mensaje')
            myEmitter.emit('msgrecibido', msg)         //ahora sólo emitimos el evento cuando llega el msg, y dejamos q listener de turno se encargue de todo
        })


        app.listen(port, () => {
        console.log(`Gateway listening on port ${port}`)
        })

        this.ingresoNombre()

    }


    ingresaApellidos = ()=> {
        let ingresa = new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese sus apellidos:')
            },
            ()=>{
                console.log();
                console.log('-------guardamos sus apellidos')
            },
        )
        return ingresa.ingresa()
    }

    ingresaTitulo = ()=> {
        let ingresa = new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese su titulo:')
            },
            (msg)=>{
                console.log(msg);
                console.log('-------guardamos sus titulo')
            },
        )
        return ingresa.ingresa()
    }


    ingresaNombres = () => {
        let ingresa = new IngresaDato(
            this.emisor, 
            ()=>{
                console.log('-------por favor ingrese sus nombres:')
            },
            (msg)=>{
                console.log(msg);
                console.log('-------guardamos sus nombres')
            },
        )
        return ingresa.ingresa()
    }

    ingresoNombre = async()=>{      //aquí realizamos todas las acciones asíncronas que se requieren para ingreso de nombre
        this.ingresaNombres()
        .then(this.ingresaApellidos)
        .then(this.ingresaTitulo)
    }


}

let demo = new Demo