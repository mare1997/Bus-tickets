import App from './app'
import * as bodyParser from 'body-parser'
import UserController from './controllers/UserController'
import CarrierController from './controllers/CarrierController'
import loggerMiddleware from './middleware/logger'
import BusStationContoller from './controllers/BusStationController'
import LocationController from './controllers/LocationController'


const app = new App({
    port: 3001,
    controllers: [
        new UserController(),
        new CarrierController(),
        new BusStationContoller(),
        new LocationController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()