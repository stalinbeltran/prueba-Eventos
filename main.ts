
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


    ingresaNombres(result:number) {
        let that = this
        console.log('por favor ingrese sus nombres:');
        // this.status = 'wait'
        // this.emisor.on('msgrecibido', (msg)=>{
        //     console.log('guardamos sus nombres');
        //     this.status = 'ingresaApellidos'
        //     this.emisor.removeListener('msgrecibido', that.ingresaNombres)
        // })
    
        return new Promise((resolve2, reject) => { // (*)
            setTimeout(() => resolve2(
                ()=>{
                    console.log('nombres recibidos');
                    return result * 2
                    
                }
            ), 1000);
        }
        )
    
    }
    
    async ingresaApellidos(msg:Mensaje){
        console.log('Esperando apellidos')
    }

    async ingresaTitulo(msg:Mensaje){
        console.log('Esperando titulo')
    }

    ingresoNombre = async(msg)=>{
        new Promise(function(resolve, reject) {

            setTimeout(() => resolve(1), 1000);
          
          }).then(this.ingresaNombres)
          .then(function(result:number) { // (**)
          
            console.log(result); // 2
          
            return new Promise((resolve, reject) => {
              setTimeout(() => resolve(result * 2), 1000);
            });
          
          }).then(function(result:number) {
          
            console.log(result); // 4
          
          });
    }

    
    mensajeRecibido = (msg:Mensaje)=>{
        console.log('mensaje recibido funcion');
        this.ingresoNombre(msg)                     //este se encarga de este proceso
        
    }

}

let demo = new Demo