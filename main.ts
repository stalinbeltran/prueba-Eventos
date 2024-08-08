
import EventEmitter from "events";
import express from "express"


const app = express()
const port = 4000

class Demo{
  constructor(){

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