"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
const conversacion_1 = require("./conversacion");
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
            msg.msg = req.query.msg;
            msg.numero = req.query.numero;
            msg.telefonoCliente = req.query.telefonocliente;
            res.send('hemos recibido el mensaje');
            myEmitter.emit('msgrecibido', msg); //ahora sólo emitimos el evento, y dejamos q listener se encargue de todo
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
        // this.emisor.on('msgrecibido', this.mensajeRecibido)       //definimos el inicio/manejador del proceso
        this.ingresoNombre();
    }
    resuelve = (before, after) => {
        return new Promise((resolve, reject) => {
            before();
            this.emisor.on('msgrecibido', function receptor(msg) {
                this.removeListener('msgrecibido', receptor); //dejamos de esperar este evento
                after(msg); //realizamos la accioin con el msg
                resolve(0); //indicamos que podemos continuar con el sgte paso, sea cual sea
            });
        });
    };
    ingresaNombresBefore = () => {
        console.log('por favor ingrese sus nombres');
    };
    ingresaNombresAfter = () => {
        console.log('guardamos sus nombres');
    };
    ingresaNombres = () => { return this.resuelve(this.ingresaNombresBefore, this.ingresaNombresAfter); };
    ingresaApellidos = () => {
        return new Promise((resolve, reject) => {
            console.log('por favor ingrese sus apellidos:');
            this.emisor.on('msgrecibido', function receptor(msg) {
                this.removeListener('msgrecibido', receptor); //dejamos de esperar este evento
                console.log('guardamos sus apellidos'); //realizamos la accioin con el msg
                resolve(87); //indicamos que podemos continuar con el sgte paso, sea cual sea
            });
        });
    };
    ingresaTitulo = () => {
        return new Promise((resolve, reject) => {
            console.log('por favor ingrese su titulo:');
            this.emisor.on('msgrecibido', function receptor(msg) {
                this.removeListener('msgrecibido', receptor); //dejamos de esperar este evento
                console.log('guardamos su titiulo'); //realizamos la accioin con el msg
                resolve(87); //indicamos que podemos continuar con el sgte paso, sea cual sea
            });
        });
    };
    ingresoNombre = async () => {
        this.ingresaNombres()
            .then(this.ingresaApellidos)
            .then(this.ingresaTitulo);
    };
}
let demo = new Demo;
