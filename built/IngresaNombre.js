"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IngresaDato_1 = __importDefault(require("./IngresaDato"));
class IngresaNombre {
    emisor;
    constructor(emisor) {
        this.emisor = emisor;
    }
    ingresoNombre = async () => {
        return this.ingresaNombres()
            .then(this.ingresaApellidos)
            .then(this.ingresaTitulo);
    };
    ingresaApellidos = () => {
        return new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese sus apellidos:');
        }, (msg) => {
            console.log('-------guardamos sus apellidos: ' + msg.numero);
        }).ingresa();
    };
    ingresaTitulo = () => {
        let ingresa = new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese su titulo:');
        }, (msg) => {
            console.log('-------guardamos sus titulo: ' + msg.numero);
        });
        return ingresa.ingresa();
    };
    ingresaNombres = () => {
        let ingresa = new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese sus nombres:');
        }, (msg) => {
            console.log('-------guardamos sus nombres: ' + msg.numero);
        });
        return ingresa.ingresa();
    };
}
exports.default = IngresaNombre;
