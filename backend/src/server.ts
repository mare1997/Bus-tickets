import App from './app'
import * as bodyParser from 'body-parser'
import UserController from './controllers/UserController'
import loggerMiddleware from './middleware/logger'


const app = new App({
    port: 3001,
    controllers: [
        new UserController(),
        
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()