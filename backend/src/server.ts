import App from './app'
import * as bodyParser from 'body-parser'
import UserController from './controllers/UserController'
import CarrierController from './controllers/CarrierController'
import loggerMiddleware from './middleware/logger'
import BusStationController from './controllers/BusStationController'
import LocationController from './controllers/LocationController'
import VehicleController from './controllers/VehicleController'
import TravelingController from './controllers/TravelingController'
import TicketController from './controllers/TicketController'
import * as helmet from "helmet";
import * as cors from "cors";
import AuthController from './controllers/AuthController'

const app = new App({
    port: 3001,
    controllers: [
        new UserController(),
        new CarrierController(),
        new BusStationController(),
        new LocationController(),
        new VehicleController(),
        new TravelingController(),
        new TicketController(),
        new AuthController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        cors(),
        helmet()
    ]
})

app.listen()