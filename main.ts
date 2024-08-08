
import EventEmitter from "events";
import express from "express"


class MyEmitter extends EventEmitter {}
const app = express()
const port = 4000

class Demo{
    contador = 0
  constructor(){

    const myEmitter = new EventEmitter();
    myEmitter.on('ingresoDataUsuario', function (telefonocliente) {
      console.log('telefonocliente', telefonocliente);
    });


    app.get('/msgrecibido', async (req, res) => {
      console.log('query', req.query)
        let query = req.query
        let telefonocliente = query.telefonocliente
        let status = this.getStatus(telefonocliente)
        switch(status){
            case 'ingresoDataUsuario':  myEmitter.emit('ingresoDataUsuario', telefonocliente); break
        }
        res.send(req.query)
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

  }

  getStatus = (telefonocliente)=>{
        this.contador++
        switch(this.contador){
            case 1: return "ingresoDataUsuario"
            case 2: return ""
        }
    return "ingresoDataUsuario"
  }


}

let demo = new Demo