import { Request, Response } from "express";
import * as express from 'express'
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import config from "../config/config";
import IControllerBase from "../interfaces/IControllerBase.interface";

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.post(this.path + "/login",async (req: Request, res: Response) => {
            //Check if username and password are set
            let { userName, password } = req.body;
            if (!(userName && password)) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
              res.status(400).send();
            }

            //Get user from database
            const userRepository = getRepository(User);
            let user: User;
            try {
              user = await userRepository.findOneOrFail({ where: { userName } });
            } catch (error) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
              res.status(401).send();
            }
            //Check if encrypted password match
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
              res.status(401).send();
              return;
            }

            //Sing JWT, valid for 1 hour
            const token = jwt.sign(
              { userId: user.id, username: user.userName },
              config.jwtSecret,
              { expiresIn: "10h" }
            );

            //Send the jwt in the response
            res.status(200)
            res.send(token);
        });
        this.router.post(this.path + '/change-password',async (req: Request, res: Response) => {
            //Get ID from JWT
            const id = res.locals.jwtPayload.userId;
            //Get parameters from the body
            const { oldPassword, newPassword } = req.body;
            if (!(oldPassword && newPassword)) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
              res.status(400).send();
            }
            //Get user from the database
            const userRepository = getRepository(User);
            let user: User;
            try {
              user = await userRepository.findOneOrFail(id);
            } catch (id) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
              res.status(401).send();
            }
            //Check if old password matchs
            if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
              res.status(401).send();
              return;
            }

            //Validate de model (password lenght)
            user.password = newPassword;
            const errors = await validate(user);
            if (errors.length > 0) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
              res.status(400).send(errors);
              return;
            }
            //Hash the new password and save
            user.hashPassword();
            userRepository.save(user);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.status(204).send();
          });
    }

}
export default AuthController;