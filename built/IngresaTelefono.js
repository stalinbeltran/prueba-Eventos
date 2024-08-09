"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IngresaDato_1 = __importDefault(require("./IngresaDato"));
class IngresaTelefono {
    emisor;
    constructor(emisor) {
        this.emisor = emisor;
    }
    ingresaTelefono = () => {
        return new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese sus telefonos:');
        }, (msg) => {
            console.log();
            console.log('-------guardamos sus telefonos');
        }).ingresa();
    };
}
exports.default = IngresaTelefono;
