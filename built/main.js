"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
const conversacion_1 = __importDefault(require("conversacion"));
class MyEmitter extends events_1.default {
}
const app = (0, express_1.default)();
const port = 4000;
class Demo {
    contador = 0;
    emisor;
    static conversaciones = [];
    constructor() {
        const myEmitter = new events_1.default();
        this.emisor = myEmitter;
        myEmitter.on('ingresoDataUsuario', function (res, conversacion) {
            let t = 'ingresoDataUsuario telefonocliente' + conversacion;
            console.log(t);
            conversacion.status = 'ingresoTelefono';
            res.send(t);
        });
        myEmitter.on('ingresoNombre', function (res, conversacion) {
            let t = 'ingresoNombre telefonocliente' + conversacion;
            console.log(t);
            // res.send(t)
            this.emit('ingresoDataUsuario', res, t); //al finalizar ingreso nombre, volvemos a ingresoDataUsuario
        });
        myEmitter.on('ingresoTelefono', function (res, conversacion) {
            let t = 'ingresoTelefono telefonocliente' + conversacion;
            console.log(t);
            conversacion.status = 'ingresoNombre';
            res.send(t);
        });
        app.get('/msgrecibido', async (req, res) => {
            console.log('query', req.query);
            let query = req.query;
            let telefonocliente = query.telefonocliente;
            let telefono = query.telefono;
            let conversacion = new conversacion_1.default(telefonocliente, telefono, 'ingresoDataUsuario');
            let status = this.getStatus(conversacion);
            myEmitter.emit(status, res, conversacion);
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
    }
    getStatus = (c) => {
        if (Demo.conversaciones.length == 0)
            Demo.conversaciones.push(c);
        let conversacion = Demo.conversaciones[0];
        return conversacion.status;
    };
}
let demo = new Demo;
