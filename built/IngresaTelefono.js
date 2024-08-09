"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IngresaDato_1 = __importDefault(require("./IngresaDato"));
class IngresaTelefono {
    emisor;
    nombreEvento;
    ingresaDato;
    constructor(emisor, nombreEvento) {
        this.emisor = emisor;
        this.nombreEvento = nombreEvento;
        this.ingresaDato = new IngresaDato_1.default(this.emisor, this.nombreEvento);
    }
    ingresaTelefono = () => {
        return this.ingresaDato.ingresa(() => {
            console.log('-------por favor ingrese sus telefonos:');
        }, (msg) => {
            console.log('-------guardamos sus telefonos: ' + msg.numero);
        });
    };
}
exports.default = IngresaTelefono;
