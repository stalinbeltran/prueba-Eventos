"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IngresaDato {
    emisor;
    before;
    after;
    nombreEvento;
    constructor(emisor, nombreEvento, before, after) {
        this.emisor = emisor;
        this.before = before;
        this.after = after;
        this.nombreEvento = nombreEvento;
    }
    resuelve = (before, after) => {
        return new Promise((resolve, reject) => {
            before();
            this.emisor.on(this.nombreEvento, function receptor(msg) {
                this.removeListener(this.nombreEvento, receptor); //dejamos de esperar este evento
                after(msg); //realizamos la accion con el msg
                resolve(0); //indicamos que podemos continuar con el sgte paso, sea cual sea
            });
        });
    };
    ingresa = () => { return this.resuelve(this.before, this.after); };
}
exports.default = IngresaDato;
