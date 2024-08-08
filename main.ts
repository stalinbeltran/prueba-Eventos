
import EventEmitter from "events";
import express from "express"
import Conversacion from "./conversacion";


class MyEmitter extends EventEmitter {}
const app = express()
const port = 4000

class Demo{
    contador = 0
    emisor:EventEmitter
    static conversaciones:Array<Conversacion> = []

  constructor(){

    const myEmitter = new EventEmitter();
    this.emisor = myEmitter
    myEmitter.on('ingresoDataUsuario', function (res, conversacion:Conversacion) {
        let t = 'ingresoDataUsuario telefonocliente' + conversacion.status
        console.log(t);
        conversacion.status = 'ingresoTelefono'
        res.send(t)
    })

    //listados de eventos disponibles, y funciones que los escuchan
    myEmitter.on('ingresoNombre', this.ingresoNombre)
    myEmitter.on('ingresaNombres', this.ingresaNombres)

    myEmitter.on('ingresoTelefono', function (res, conversacion:Conversacion) {
        let t = 'ingresoTelefono telefonocliente' + conversacion.status
        console.log(t);
        conversacion.status = 'ingresoNombre'
        res.send(t)
    })


    app.get('/msgrecibido', async (req, res) => {
        console.log('query', req.query)
        myEmitter.emit('msgrecibido', res, req)         //ahora sólo emitimos el evento, y dejamos q listener se encargue de todo
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

    this.emisor.on('msgrecibido', this.mensajeRecibido)
  }

  getStatus = (c:Conversacion)=>{
        return c.status
  }

    async ingresaNombres(res, conversacion:Conversacion){
        res.send('recibiendo nombres')       //respuesta simple a la página, para saber qué estamos haciendo
        console.log(conversacion.status);
        
    }
    
    async ingresaApellidos(res, conversacion:Conversacion){
        console.log('Esperando apellidos')
        res.send('Esperando apellidos')
    }

    async ingresaTitulo(res, conversacion:Conversacion){
        console.log('Esperando titulo')
        res.send('Esperando titulo')
    }

    ingresoNombre = async(res, conversacion:Conversacion)=>{
        conversacion.status = 'ingresaNombres'      //esto permite que el control vuelva a esta función cuando llegue otro mensaje
        res.send('Esperando nombres')
        // .then(this.ingresaApellidos)
        
    }

    
    mensajeRecibido = (res, req)=>{
        console.log('hemos recibido el mensaje');
        
    }

}

let demo = new Demo