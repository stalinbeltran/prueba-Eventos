"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
const conversacion_1 = require("./conversacion");
const IngresaNombre_1 = __importDefault(require("./IngresaNombre"));
const IngresaTelefono_1 = __importDefault(require("./IngresaTelefono"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = 4000;
class Bot {
    emisor;
    status;
    conversaciones;
    constructor() {
        this.emisor = new events_1.default();
        this.conversaciones = [];
        app.get('/msgrecibido', async (req, res) => {
            let msg = new conversacion_1.Mensaje;
            //llenamos propiedades de msg con datos del request
            msg.msg = req.query.msg;
            msg.numero = req.query.numero;
            msg.telefonoCliente = req.query.telefonocliente;
            //respondemos al request, para evitar que se quede esperando
            res.send('hemos recibido el mensaje');
            this.emisor.emit('msgrecibido', msg); //ahora sólo emitimos el evento cuando llega el msg, y dejamos q listener de turno se encargue de todo
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
        // //creamos a los trabajadores
        // let n = new IngresaNombre(this.emisor)
        // let t = new IngresaTelefono(this.emisor)
        // //los llamamos en el orden deseado
        // n.ingresoNombre()
        // .then(t.ingresaTelefono)
        this.emisor.on('msgrecibido', this.distribuidor); //sólo distribuidor recibe msgrecibido
        let myuuid = (0, uuid_1.v4)();
        console.log('Your UUID is: ' + myuuid);
    }
    getUUID() {
        let myuuid = (0, uuid_1.v4)();
        return myuuid;
    }
    iniciarTarea(nombreEvento) {
        //creamos a los trabajadores
        let n = new IngresaNombre_1.default(this.emisor, nombreEvento);
        let t = new IngresaTelefono_1.default(this.emisor, nombreEvento);
        //los llamamos en el orden deseado
        n.ingresoNombre()
            .then(t.ingresaTelefono);
    }
    distribuidor = (msg) => {
        let telefono = msg.numero;
        let found = this.conversaciones.find((element) => element.telefono == telefono); //lo buscamos en el arreglo de conversaciones
        if (!found) {
            let nombreEvento = this.getUUID(); //si no existe, agregamos nueva conversacion
            let c = new conversacion_1.Conversacion(nombreEvento, telefono);
            this.iniciarTarea(nombreEvento); //creamos los listeners para esta conversacion
            found = c;
            this.conversaciones.push(found);
        }
        this.emisor.emit(found.nombreEvento, msg); //como hay un mensaje q no hemos atendido aún, emitimos el evento
    };
}
let bot = new Bot;
