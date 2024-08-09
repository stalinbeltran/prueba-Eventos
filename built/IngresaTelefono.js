"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IngresaDato_1 = __importDefault(require("./IngresaDato"));
const app = (0, express_1.default)();
const port = 4000;
class IngresaTelefono {
    emisor;
    constructor(emisor) {
        this.emisor = emisor;
    }
    ingreso = async () => {
        this.ingresaTelefono();
    };
    ingresaTelefono = () => {
        return new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese sus telefonos:');
        }, () => {
            console.log();
            console.log('-------guardamos sus telefonos');
        }).ingresa();
    };
}
exports.default = IngresaTelefono;
