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
    telefonos;
    constructor() {
        this.emisor = new events_1.default();
        this.telefonos = [];
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
        let myuuid = (0, uuid_1.v4)();
        console.log('Your UUID is: ' + myuuid);
    }
    distribuidor = (msg) => {
        let telefono = msg.numero;
        const found = this.telefonos.find((element) => element == telefono);
        if (!found) {
            //creamos a los trabajadores
            let n = new IngresaNombre_1.default(this.emisor);
            let t = new IngresaTelefono_1.default(this.emisor);
            //los llamamos en el orden deseado
            n.ingresoNombre()
                .then(t.ingresaTelefono);
        }
    };
}
let bot = new Bot;
