"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
class MyEmitter extends events_1.default {
}
const app = (0, express_1.default)();
const port = 4000;
class Demo {
    contador = 0;
    emisor;
    constructor() {
        const myEmitter = new events_1.default();
        this.emisor = myEmitter;
        myEmitter.on('ingresoDataUsuario', function (res, telefonocliente) {
            let t = 'ingresoDataUsuario telefonocliente' + telefonocliente;
            console.log(t);
            res.send(t);
        });
        myEmitter.on('ingresoNombre', function (res, telefonocliente) {
            let t = 'ingresoNombre telefonocliente' + telefonocliente;
            console.log(t);
            // res.send(t)
            this.emit('ingresoDataUsuario', res, t); //al finalizar ingreso nombre, volvemos a ingresoDataUsuario
        });
        myEmitter.on('ingresoTelefono', function (res, telefonocliente) {
            let t = 'ingresoTelefono telefonocliente' + telefonocliente;
            console.log(t);
            res.send(t);
        });
        app.get('/msgrecibido', async (req, res) => {
            console.log('query', req.query);
            let query = req.query;
            let telefonocliente = query.telefonocliente;
            let status = this.getStatus(telefonocliente);
            myEmitter.emit(status, res, telefonocliente);
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
    }
    getStatus = (telefonocliente) => {
        this.contador++;
        switch (this.contador) {
            case 1: return "ingresoDataUsuario";
            case 2: return "ingresoNombre";
            case 3: return "ingresoTelefono";
            default: this.contador = 0;
        }
        return "ingresoDataUsuario";
    };
}
let demo = new Demo;
