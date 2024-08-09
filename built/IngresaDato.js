"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IngresaDato {
    emisor;
    nombreEvento;
    constructor(emisor, nombreEvento) {
        this.emisor = emisor;
        this.nombreEvento = nombreEvento;
    }
    ingresa = (before, after) => {
        let that = this;
        return new Promise((resolve, reject) => {
            before();
            this.emisor.on(this.nombreEvento, function receptor(msg) {
                this.removeListener(that.nombreEvento, receptor); //dejamos de esperar este evento
                after(msg); //realizamos la accion con el msg
                resolve(0); //indicamos que podemos continuar con el sgte paso, sea cual sea
            });
        });
    };
}
exports.default = IngresaDato;
