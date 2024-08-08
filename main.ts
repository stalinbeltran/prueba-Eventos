
import EventEmitter from "events";
import express from "express"
import Conversacion from "conversacion";


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
        let t = 'ingresoDataUsuario telefonocliente' + conversacion
        console.log(t);
        conversacion.status = 'ingresoTelefono'
        res.send(t)
    })

    myEmitter.on('ingresoNombre', function (res, conversacion:Conversacion) {
        let t = 'ingresoNombre telefonocliente' + conversacion
        console.log(t);
        // res.send(t)
        this.emit('ingresoDataUsuario', res, t)     //al finalizar ingreso nombre, volvemos a ingresoDataUsuario
    })

    myEmitter.on('ingresoTelefono', function (res, conversacion:Conversacion) {
        let t = 'ingresoTelefono telefonocliente' + conversacion
        console.log(t);
        conversacion.status = 'ingresoNombre'
        res.send(t)
    })


    app.get('/msgrecibido', async (req, res) => {
      console.log('query', req.query)
        let query = req.query
        let telefonocliente = query.telefonocliente
        let telefono = query.telefono

        let conversacion = new Conversacion(telefonocliente, telefono, 'ingresoDataUsuario')
        let status = this.getStatus(conversacion)
        myEmitter.emit(status, res, conversacion)
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

  }

  getStatus = (c:Conversacion)=>{
        if(Demo.conversaciones.length == 0) Demo.conversaciones.push(c)
        let conversacion = Demo.conversaciones[0]
        return conversacion.status
  }


}

let demo = new Demo