"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IngresaDato {
    emisor;
    before;
    after;
    constructor(emisor, before, after) {
        this.emisor = emisor;
        this.before = before;
        this.after = after;
    }
    resuelve = (before, after) => {
        return new Promise((resolve, reject) => {
            before();
            this.emisor.on('msgrecibido', function receptor(msg) {
                this.removeListener('msgrecibido', receptor); //dejamos de esperar este evento
                after(msg); //realizamos la accion con el msg
                resolve(0); //indicamos que podemos continuar con el sgte paso, sea cual sea
            });
        });
    };
    ingresa = () => { return this.resuelve(this.before, this.after); };
}
exports.default = IngresaDato;
