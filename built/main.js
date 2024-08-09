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
            console.log('hemos recibido el mensaje');
            console.log(msg);
            res.send('hemos recibido el mensaje');
            myEmitter.emit('msgrecibido', msg); //ahora sólo emitimos el evento, y dejamos q listener se encargue de todo
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
        this.emisor.on('msgrecibido', this.mensajeRecibido); //definimos el inicio/manejador del proceso
    }
    ingresaNombres = (result) => {
        let that = this;
        return new Promise((resolve, reject) => {
            console.log('por favor ingrese sus nombres:');
            // this.status = 'wait'
            that.emisor.on('msgrecibido', (msg) => {
                that.emisor.removeListener('msgrecibido', that.ingresaNombres); //dejamos de esperar este evento
                console.log('guardamos sus nombres'); //realizamos la accioin con el msg
                console.log(msg);
                resolve(87); //indicamos que podemos continuar con el sgte paso, sea cual sea
                // this.status = 'ingresaApellidos'
            });
        });
    };
    async ingresaApellidos(msg) {
        console.log('Esperando apellidos');
    }
    async ingresaTitulo(msg) {
        console.log('Esperando titulo');
    }
    ingresoNombre = async (msg) => {
        new Promise(function (resolve, reject) {
            setTimeout(() => resolve(1), 1000);
        }).then(this.ingresaNombres)
            .then(function (result) {
            console.log(result); // 2
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(result * 2), 1000);
            });
        }).then(function (result) {
            console.log(result); // 4
        });
    };
    mensajeRecibido = (msg) => {
        console.log('mensaje recibido funcion');
        this.ingresoNombre(msg); //este se encarga de este proceso
    };
}
let demo = new Demo;
