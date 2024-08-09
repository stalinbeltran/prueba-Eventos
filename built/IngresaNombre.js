"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IngresaDato_1 = __importDefault(require("./IngresaDato"));
class IngresaNombre {
    emisor;
    nombreEvento;
    ingresaDato;
    constructor(emisor, nombreEvento) {
        this.emisor = emisor;
        this.nombreEvento = nombreEvento;
        this.ingresaDato = new IngresaDato_1.default(this.emisor, this.nombreEvento);
    }
    ingresoNombre = async () => {
        return this.ingresaNombres()
            .then(this.ingresaApellidos)
            .then(this.ingresaTitulo);
    };
    ingresaApellidos = () => {
        return this.ingresaDato.ingresa(() => {
            console.log('-------por favor ingrese sus apellidos:');
        }, (msg) => {
            console.log('-------guardamos sus apellidos: ' + msg.numero);
        });
    };
    ingresaTitulo = () => {
        return this.ingresaDato.ingresa(() => {
            console.log('-------por favor ingrese sus titulo:');
        }, (msg) => {
            console.log('-------guardamos sus titulo: ' + msg.numero);
        });
    };
    ingresaNombres = () => {
        return this.ingresaDato.ingresa(() => {
            console.log('-------por favor ingrese sus nombres:');
        }, (msg) => {
            console.log('-------guardamos sus nombres: ' + msg.numero);
        });
    };
}
exports.default = IngresaNombre;
