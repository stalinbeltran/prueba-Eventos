
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
        console.log('hemos recibido el mensaje');
        console.log(msg);
        res.send('hemos recibido el mensaje')
        myEmitter.emit('msgrecibido', msg)         //ahora sólo emitimos el evento, y dejamos q listener se encargue de todo
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

    this.emisor.on('msgrecibido', this.mensajeRecibido)       //definimos el inicio/manejador del proceso
  }

    async ingresaNombres(msg){
        let that = this
        // console.log(that);
        
        console.log('por favor ingrese sus nombres:');
        this.status = 'wait'
        this.emisor.on('msgrecibido', (msg)=>{
            // console.log(msg);
            console.log('guardamos sus nombres');
            this.status = 'ingresaApellidos'
            // console.log(that);
            // console.log('that.ingresaNombres');
            // console.log(that.ingresaNombres);
            
            this.emisor.removeListener('msgrecibido', that.ingresaNombres)
        })
        
    }
    
    async ingresaApellidos(msg:Mensaje){
        console.log('Esperando apellidos')
    }

    async ingresaTitulo(msg:Mensaje){
        console.log('Esperando titulo')
    }

    ingresoNombre = async(msg)=>{
        if(this.status==undefined) this.status = 'ingresaNombres'
        console.log('this.status');
        console.log(this.status);
        
        switch(this.status){
            case 'ingresaNombres': this.ingresaNombres(msg); break
            case 'ingresaApellidos': this.ingresaApellidos(msg); break
            case 'ingresaTitulo': this.ingresaTitulo(msg); break
        }
        console.log('ingresoNombre');
        console.log('por favor ingrese sus nombres:')

        
    }

    
    mensajeRecibido = (msg:Mensaje)=>{
        console.log('mensaje recibido funcion');
        this.ingresoNombre(msg)                     //este se encarga de este proceso
        
    }

}

let demo = new Demo