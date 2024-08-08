"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
class MyEmitter extends events_1.default {
}
const app = (0, express_1.default)();
const port = 4000;
class Demo {
    constructor() {
        const myEmitter = new events_1.default();
        myEmitter.on('event', (a, b) => {
            console.log(a, b, this);
            // Prints: a b {}
        });
        myEmitter.emit('event', 'a', 'bar');
        app.get('/msgrecibido', async (req, res) => {
            console.log('query', req.query);
            res.send(req.query);
        });
        app.listen(port, () => {
            console.log(`Gateway listening on port ${port}`);
        });
    }
}
let demo = new Demo;
