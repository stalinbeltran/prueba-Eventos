"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mensaje = exports.Conversacion = void 0;
class Mensaje {
    msg;
    telefonoCliente;
    numero;
}
exports.Mensaje = Mensaje;
class Conversacion {
    telefono;
    nombreEvento;
    constructor(nombreEvento, telefono) {
        this.nombreEvento = nombreEvento;
        this.telefono = telefono;
    }
}
exports.Conversacion = Conversacion;
