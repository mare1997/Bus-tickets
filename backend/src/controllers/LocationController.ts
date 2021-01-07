import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Location } from '../entity/Location';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

class LocationController implements IControllerBase {

  public path = '/location'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path, async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        const locationFromDB = await locationRepository.find({ relations: ["carrier", "user"] });
        const carrierId = req.params.carrierId;
        var location = [];
        locationFromDB.forEach(element => {
          if (!element.deleted) {
            location.push(element);
          }
        });
        
        res.send(location);
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.get(this.path + '/:locationId', validateJOI(schemas.locationGetById, 'params'), async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        var locationId = req.params.locationId;
        const location = await locationRepository.findOne(locationId);
        
        if (!location.deleted) {
          res.send(location);
        } else {
          res.status(404);
          res.send("Location not found.");
        }

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.post(this.path, [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.locationPOST, 'body')], async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        let location = req.body;

        await locationRepository.save(location);
        
        res.status(201);
        res.send(location);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.locationPUT, 'body')], async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        let location = req.body;

        await locationRepository.save(location);
        
        res.status(200);
        res.send(location);
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });
    this.router.delete(this.path + '/:locationId', [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.locationGetById, 'params')], async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        var locationId = req.params.locationId;
        const location = await locationRepository.findOne(locationId);
        location.deleted = true;
        await locationRepository.save(location);
        
        res.send(200);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });

  }

}
export default LocationController