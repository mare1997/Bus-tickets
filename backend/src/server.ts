import App from './app'
import * as bodyParser from 'body-parser'
import UserController from './controllers/UserController'
import CarrierController from './controllers/CarrierController'
import loggerMiddleware from './middleware/logger'
import BusStationController from './controllers/BusStationController'
import LocationController from './controllers/LocationController'
import VehicleController from './controllers/VehicleController'


const app = new App({
    port: 3001,
    controllers: [
        new UserController(),
        new CarrierController(),
        new BusStationController(),
        new LocationController(),
        new VehicleController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()