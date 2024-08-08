
import EventEmitter from "events";
import express from "express"


class MyEmitter extends EventEmitter {}
const app = express()
const port = 4000

class Demo{
  constructor(){

    const myEmitter = new MyEmitter();
    myEmitter.on('event', (a, b) => {
      console.log(a, b, this);
      // Prints: a b {}
    });
    myEmitter.emit('event', 'a', 'b');

    app.get('/msgrecibido', async (req, res) => {
      console.log('query', req.query)
        res.send(req.query)
    })


    app.listen(port, () => {
      console.log(`Gateway listening on port ${port}`)
    })

  }


}

let demo = new Demo