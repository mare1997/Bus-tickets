import * as express from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import Database from "../services/Database";
import { validate } from "class-validator";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import { User } from '../entity/User';
import { Location } from '../entity/Location';
import { getRepository } from 'typeorm';


class UserContoller implements IControllerBase {
  public path = '/user'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path, [checkJwt, checkRole(["ADMIN"])], async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        let usersFromDB = await userRepository.find();
        let users = [];
        usersFromDB.forEach(element => {
          if (!element.deleted) {
            users.push(element);
          }
        });
        
        res.send(users);
      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.get(this.path + "/:userId", [checkJwt, checkRole(["ADMIN"])], async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        var userId = req.params.userId;
        let user = await userRepository.findOne(userId);
        
        if (!user.deleted) {
          res.send(user);
        } else {
          res.send("User not found", 404);
        }
      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.post('/register', async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        const locationRepository = getRepository(Location);
        let user = new User();
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.location = await locationRepository.findOne(req.body.locationId);
        user.role = req.body.role;
        
        let findUser = await userRepository.getUserByUsername(user.userName);
        if (findUser) {
          throw new Error('User with that username exist');
        }
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        user.hashPassword();
        await userRepository.save(user);
        
        res.status(201);
        res.send(user);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, [checkJwt, checkRole(["ADMIN", "EMPLOYER", "USER"])], async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        let user = req.body;
        try {
          user = await userRepository.findOneOrFail(user.id);
        } catch (error) {
          //If not found, send a 404 response
          res.status(404).send("User not found");
          return;
        }
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }

        try {
          await userRepository.save(user);
        } catch (e) {
          res.status(409).send("username already in use");
          return;
        }
        
        res.send(user, 200);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.delete(this.path + '/:userId', [checkJwt, checkRole(["ADMIN"])], async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        var userId = req.params.userId;
        const user = await userRepository.findOne(userId);
        user.deleted = true;
        await userRepository.save(user);
        
        res.send(200);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });

  }


}
export default UserContoller