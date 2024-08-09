"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IngresaDato_1 = __importDefault(require("./IngresaDato"));
const app = (0, express_1.default)();
const port = 4000;
class IngresaNombre {
    emisor;
    constructor(emisor) {
        this.emisor = emisor;
    }
    ingresoNombre = async () => {
        this.ingresaNombres()
            .then(this.ingresaApellidos)
            .then(this.ingresaTitulo);
    };
    ingresaApellidos = () => {
        return new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese sus apellidos:');
        }, () => {
            console.log();
            console.log('-------guardamos sus apellidos');
        }).ingresa();
    };
    ingresaTitulo = () => {
        let ingresa = new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese su titulo:');
        }, (msg) => {
            console.log(msg);
            console.log('-------guardamos sus titulo');
        });
        return ingresa.ingresa();
    };
    ingresaNombres = () => {
        let ingresa = new IngresaDato_1.default(this.emisor, () => {
            console.log('-------por favor ingrese sus nombres:');
        }, (msg) => {
            console.log(msg);
            console.log('-------guardamos sus nombres');
        });
        return ingresa.ingresa();
    };
}
exports.default = IngresaNombre;
