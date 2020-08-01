import "reflect-metadata";
import * as express from 'express'
import { Application } from 'express'
import Database from './services/Database';
//import cors from 'cors'
var cors = require('cors')

class App {

    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any;}) {
        this.app = express()
        this.port = appInit.port
        this.app.use(cors())
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.database()
        
        
        //this.assets()
        //this.template()
    }
    private async database() {
        await Database.createConnection();
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public listen() {
        
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
            
        })
    }
}
export default App

