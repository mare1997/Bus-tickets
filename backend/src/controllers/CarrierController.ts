import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { Carrier } from '../entity/Carrier';
import { getRepository, Like } from 'typeorm';
import { Location } from '../entity/Location';


class CarrierController implements IControllerBase {

  public path = '/carrier'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path, async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        const carriersFromDB = await carrierRepository.find({ relations: ["location"] });
        var carriers = [];
        carriersFromDB.forEach(element => {
          if (!element.deleted) {
            carriers.push(element);
          }
        });
        
        res.send(carriers);
      } catch (e) {
        
        res.send("Error " + e);
      }
    });
    this.router.get(this.path + '/:carrierId', async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        var carrierId = req.params.carrierId;
        const carrier = await carrierRepository.findOne(carrierId, { relations: ["location"] });
        
        if (!carrier.deleted) {
          res.send(carrier);
        } else {
          res.status(404);
          res.send("Carrier not found");
        }

      } catch (e) {
        
        res.send("Error " + e);
      }
    });
    this.router.post(this.path + '/search', async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        let filterOptions = req.body;
        const carriers = await carrierRepository.find({ name: Like('%' + filterOptions.value + '%') });
        
        if (carriers) {
          res.send(carriers);
        } else {
          res.status(404);
          res.send("Carriers not found");
        }
      } catch (e) {
        
        res.send("Error " + e);
      }

    });

    this.router.post(this.path, async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        const locationRepository = getRepository(Location);
        let carrier = req.body;
        let location = await locationRepository.findOne(carrier.locationId);
        carrier.location = location;
        await carrierRepository.save(carrier);
        
        res.status(201);
        res.send(carrier);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        const locationRepository = getRepository(Location);
        let carrier = req.body;
        let location = await locationRepository.findOne(carrier.locationId);
        carrier.location = location;
        await carrierRepository.save(carrier);
        
        res.status(200);
        res.send(carrier);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });

    this.router.delete(this.path + '/:carrierId', async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        var carrierId = req.params.carrierId;
        const carrier = await carrierRepository.findOne(carrierId);
        carrier.deleted = true;
        await carrierRepository.save(carrier);
        
        res.send(200);

      } catch (e) {
        
        res.send("Error " + e);
      };
    });

  }
}
export default CarrierController