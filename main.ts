
import EventEmitter from "events";
import express from "express"
import {Conversacion, Mensaje } from "./conversacion";

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
        myEmitter.emit('msgrecibido', msg)         //ahora sólo emitimos el evento, y dejamos q listener se encargue de todo
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

    // this.emisor.on('msgrecibido', this.mensajeRecibido)       //definimos el inicio/manejador del proceso
    this.ingresoNombre()

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


    ingresaNombresBefore = ()=> {
        console.log('por favor ingrese sus nombres');        
    }
    
    ingresaNombresAfter = ()=> {
        console.log('por favor ingrese sus nombres');        
    }

    ingresaNombres = ()=>{ return this.resuelve(this.ingresaNombresBefore, this.ingresaNombresAfter)}

    ingresaApellidos = ()=> {
        return new Promise((resolve, reject) => {
            console.log('por favor ingrese sus apellidos:');
            this.emisor.on('msgrecibido', function receptor(msg){
                this.removeListener('msgrecibido', receptor)      //dejamos de esperar este evento
                console.log('guardamos sus apellidos');                               //realizamos la accioin con el msg
                resolve(87)                                                         //indicamos que podemos continuar con el sgte paso, sea cual sea
            })
        })

    }

    ingresaTitulo = ()=> {
        return new Promise((resolve, reject) => {
            console.log('por favor ingrese su titulo:');
            this.emisor.on('msgrecibido', function receptor(msg){
                this.removeListener('msgrecibido', receptor)      //dejamos de esperar este evento
                console.log('guardamos su titiulo');                               //realizamos la accioin con el msg
                resolve(87)                                                         //indicamos que podemos continuar con el sgte paso, sea cual sea
            })
        })

    }



    ingresoNombre = async()=>{
        this.ingresaNombres()
        .then(this.ingresaApellidos)
        .then(this.ingresaTitulo)
    }


}

let demo = new Demo