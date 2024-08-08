"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
class Demo {
    constructor() {
        app.get('/msgrecibido', async (req, res) => {
            console.log('query', req.query);
        });
        //Gateway ofrece webservice para enviar mensajes
        app.get('/enviarmsg', async (req, res) => {
            console.log('query', req.query);
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
    }
}
