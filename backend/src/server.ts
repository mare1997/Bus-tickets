import App from './app'
import * as bodyParser from 'body-parser'
import UserController from './controllers/UserController'
import CarrierController from './controllers/CarrierController'
import loggerMiddleware from './middleware/logger'
import BusStationContoller from './controllers/BusStationController'


const app = new App({
    port: 3001,
    controllers: [
        new UserController(),
        new CarrierController(),
        new BusStationContoller()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()