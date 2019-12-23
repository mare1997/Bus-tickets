import App from './app'
import * as bodyParser from 'body-parser'
import UserController from './controllers/UserController'
import CarrierController from './controllers/CarrierController'
import loggerMiddleware from './middleware/logger'


const app = new App({
    port: 3001,
    controllers: [
        new UserController(),
        new CarrierController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()