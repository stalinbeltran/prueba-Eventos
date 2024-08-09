
import EventEmitter from "events";
import express from "express"
import { Mensaje } from "./conversacion";
import IngresaNombre from "./IngresaNombre";
import IngresaTelefono from "./IngresaTelefono";
import {v4 as UUID} from 'uuid';

const app = express()
const port = 4000

class Bot{
    emisor:EventEmitter
    status:string
    telefonos:Array<string>

    constructor(){
        this.emisor = new EventEmitter();
        this.telefonos = []

        app.get('/msgrecibido', async (req, res) => {       //alguien nos envía un msg, vía http
            let msg = new Mensaje
            //llenamos propiedades de msg con datos del request
            msg.msg = req.query.msg
            msg.numero = req.query.numero
            msg.telefonoCliente = req.query.telefonocliente
            //respondemos al request, para evitar que se quede esperando
            res.send('hemos recibido el mensaje')
            this.emisor.emit('msgrecibido', msg)         //ahora sólo emitimos el evento cuando llega el msg, y dejamos q listener de turno se encargue de todo
        })


        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`)
        })

        // //creamos a los trabajadores
        // let n = new IngresaNombre(this.emisor)
        // let t = new IngresaTelefono(this.emisor)

        // //los llamamos en el orden deseado
        // n.ingresoNombre()
        // .then(t.ingresaTelefono)


        let myuuid = UUID();

        console.log('Your UUID is: ' + myuuid);
    }

    distribuidor = (msg:Mensaje)=>{
        let telefono = msg.numero
        const found = this.telefonos.find((element) => element == telefono);
        if(!found){
            //creamos a los trabajadores
            let n = new IngresaNombre(this.emisor)
            let t = new IngresaTelefono(this.emisor)

            //los llamamos en el orden deseado
            n.ingresoNombre()
            .then(t.ingresaTelefono)
        }
    }


}

let bot = new Bot