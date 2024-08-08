"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Conversacion;
