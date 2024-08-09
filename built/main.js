"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
const conversacion_1 = require("./conversacion");
const IngresaNombre_1 = __importDefault(require("./IngresaNombre"));
const app = (0, express_1.default)();
const port = 4000;
class Demo {
    contador = 0;
    emisor;
    status;
    constructor() {
        const myEmitter = new events_1.default();
        this.emisor = myEmitter;
        app.get('/msgrecibido', async (req, res) => {
            let msg = new conversacion_1.Mensaje;
            //llenamos propiedades de msg con datos del request
            msg.msg = req.query.msg;
            msg.numero = req.query.numero;
            msg.telefonoCliente = req.query.telefonocliente;
            //respondemos al request, para evitar que se quede esperando
            res.send('hemos recibido el mensaje');
            myEmitter.emit('msgrecibido', msg); //ahora sólo emitimos el evento cuando llega el msg, y dejamos q listener de turno se encargue de todo
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
        let n = new IngresaNombre_1.default(this.emisor);
        n.ingresoNombre();
    }
}
let demo = new Demo;
