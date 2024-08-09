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
    telefonoCliente;
    telefono;
    status;
    constructor(telefonoCliente, telefono, status) {
        this.telefono = telefono;
        this.telefonoCliente = telefonoCliente;
        this.status = status;
    }
}
exports.Conversacion = Conversacion;
