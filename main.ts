
import EventEmitter from "events";
import express from "express"
import { Conversacion, Mensaje } from "./conversacion";
import IngresaNombre from "./IngresaNombre";
import IngresaTelefono from "./IngresaTelefono";
import {v4 as UUID} from 'uuid';

const app = express()
const port = 4000

class Bot{
    emisor:EventEmitter
    status:string
    conversaciones:Array<Conversacion>

    constructor(){
        this.emisor = new EventEmitter();
        this.conversaciones = []

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

        this.emisor.on('msgrecibido', this.distribuidor)        //sólo distribuidor recibe msgrecibido
    }

    private getUUID(){
        let myuuid = UUID()
        return myuuid
    }

    private iniciarTarea(nombreEvento:string){
        //creamos a los trabajadores
        let n = new IngresaNombre(this.emisor, nombreEvento)
        let t = new IngresaTelefono(this.emisor, nombreEvento)

        //los llamamos en el orden deseado
        n.ingresoNombre()
        .then(t.ingresaTelefono)
    }

    distribuidor = (msg:Mensaje)=>{                 //recibe todos los mensajes que llegan, y los distribuye a los eventos correspondientes
        let telefono = msg.numero
        let found = this.conversaciones.find((element) => element.telefono == telefono);     //lo buscamos en el arreglo de conversaciones
        if(!found){
            let nombreEvento = this.getUUID()                       //si no existe, agregamos nueva conversacion
            let c = new Conversacion(nombreEvento, telefono)
            this.iniciarTarea(nombreEvento)                         //creamos los listeners para esta conversacion
            found = c
            this.conversaciones.push(found)
        }
        this.emisor.emit(found.nombreEvento, msg)                   //como hay un mensaje q no hemos atendido aún, emitimos el evento
    }


}

let bot = new Bot