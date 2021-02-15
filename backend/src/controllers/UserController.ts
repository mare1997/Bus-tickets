import * as express from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import Database from "../services/Database";
import { validate } from "class-validator";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import { User } from '../entity/User';
import { Location } from '../entity/Location';
import { getRepository } from 'typeorm';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'
import { Carrier } from '../entity/Carrier';
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
        let usersFromDB = await userRepository.find({ relations: ["location", "carrier"] });
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
    this.router.get(this.path + "/:userId", [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.userGetByUserId, 'params')], async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        var userId = req.params.userId;
        let user = await userRepository.findOne(userId, { relations: ["location", "carrier"] });

        if (!user.deleted) {
          res.send(user);
        } else {
          res.send("User not found", 404);
        }
      } catch (e) {

        res.send("Error " + e);
      };
    });
    this.router.post('/register', validateJOI(schemas.userPOST, 'body'), async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        const locationRepository = getRepository(Location);
        const carrierRepository = getRepository(Carrier);
        let user = new User();
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phone = req.body.phone;
        user.location = await locationRepository.findOne(req.body.locationId);
        if(req.body.carrierId) {
          user.carrier = await carrierRepository.findOne(req.body.carrierId);
        }
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
    this.router.put(this.path, [checkJwt, checkRole(["ADMIN", "USER"]), validateJOI(schemas.userPUT, 'body')], async (req, res) => {
      try {
        const userRepository = Database.getUserCustomRepository();
        const locationRepository = getRepository(Location);
        const carrierRepository = getRepository(Carrier);
        let user = req.body;
        try {
          user = await userRepository.findOneOrFail(user.id);
          user.userName = req.body.userName;
          user.password = req.body.password;
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.age = req.body.age;
          user.phone = req.body.phone;
          user.location = await locationRepository.findOne(req.body.locationId);
          if(req.body.carrierId) {
            user.carrier = await carrierRepository.findOne(req.body.carrierId);
          }
          user.role = req.body.role;
        } catch (error) {
          //If not found, send a 404 response
          res.status(404).send("User not found");
          return;
        }
        user.hashPassword();
        await userRepository.save(user);
        res.send(user, 200);

      } catch (e) {
          res.send("Error " + e);
      };
    });
    this.router.delete(this.path + '/:userId', [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.userGetByUserId, 'params')], async (req, res) => {
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