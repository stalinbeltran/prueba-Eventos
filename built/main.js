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
    constructor() {
        const myEmitter = new events_1.default();
        myEmitter.on('ingresoDataUsuario', function (telefonocliente) {
            console.log('telefonocliente', telefonocliente);
        });
        app.get('/msgrecibido', async (req, res) => {
            console.log('query', req.query);
            let query = req.query;
            let telefonocliente = query.telefonocliente;
            let status = this.getStatus(telefonocliente);
            switch (status) {
                case 'ingresoDataUsuario':
                    myEmitter.emit('ingresoDataUsuario', telefonocliente);
                    break;
            }
            res.send(req.query);
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
    }
    getStatus = (telefonocliente) => {
        this.contador++;
        switch (this.contador) {
            case 1: return "ingresoDataUsuario";
            case 2: return "";
        }
        return "ingresoDataUsuario";
    };
}
let demo = new Demo;
