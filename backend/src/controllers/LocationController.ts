import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Location } from '../entity/Location';

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
        
        res.send("Error " + e);
      }
    });
    this.router.get(this.path + '/:locationId', async (req, res) => {
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
        
        res.send("Error " + e);
      }
    });
    this.router.post(this.path, async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        let location = req.body;

        await locationRepository.save(location);
        
        res.status(201);
        res.send(location);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        let location = req.body;

        await locationRepository.save(location);
        
        res.status(404);
        res.send(location);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.delete(this.path + '/:locationId', async (req, res) => {
      try {
        const locationRepository = getRepository(Location);
        var locationId = req.params.locationId;
        const location = await locationRepository.findOne(locationId);
        location.deleted = true;
        await locationRepository.save(location);
        
        res.send(200);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });

  }

}
export default LocationController