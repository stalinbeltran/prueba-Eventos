
import EventEmitter from "events";
import express from "express"


class MyEmitter extends EventEmitter {}
const app = express()
const port = 4000

class Demo{
    contador = 0
  constructor(){

    const myEmitter = new EventEmitter();

    myEmitter.on('ingresoDataUsuario', function (res, telefonocliente) {
        let t = 'ingresoDataUsuario telefonocliente' + telefonocliente + 'contador: ' + this.contador
        console.log(t);
        res.send(t)
    })

    myEmitter.on('ingresoNombre', function (res, telefonocliente) {
        let t = 'ingresoNombre telefonocliente' + telefonocliente + 'contador: ' + this.contador
        console.log(t);
        res.send(t)
    })

    myEmitter.on('ingresoTelefono', function (res, telefonocliente) {
        let t = 'ingresoTelefono telefonocliente' + telefonocliente + 'contador: ' + this.contador
        console.log(t);
        res.send(t)
    })


    app.get('/msgrecibido', async (req, res) => {
      console.log('query', req.query)
        let query = req.query
        let telefonocliente = query.telefonocliente
        let status = this.getStatus(telefonocliente)
        myEmitter.emit(status, res, telefonocliente)
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

  }

  getStatus = (telefonocliente)=>{
        this.contador++
        switch(this.contador){
            case 1: return "ingresoDataUsuario"
            case 2: return "ingresoNombre"
            case 2: return "ingresoTelefono"
        }
    return "ingresoDataUsuario"
  }


}

let demo = new Demo