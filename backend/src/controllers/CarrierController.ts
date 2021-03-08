import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { Carrier } from '../entity/Carrier';
import { getRepository, Like } from 'typeorm';
import { Location } from '../entity/Location';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import { Review } from '../entity/Review';
import { sum } from '../services/Sum'
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
        const reviewRepository = getRepository(Review);
        const reviewFromDB = await reviewRepository.find({ relations: ["carrier", "user"]});
        const carriers = carriersFromDB.filter(carrier => !carrier.deleted)
        for (const carrier of carriers) {
          const reviews = reviewFromDB.filter(review => review.carrier.id === carrier.id)
          const vehicle = reviews.map(review => review.rollingStock)
          const staff = reviews.map(review => review.staff)
          const accuracy = reviews.map(review => review.accuracy)
          const hygiene = reviews.map(review => review.hygiene)
          //@ts-ignore
          carrier.rollingStock = vehicle.length > 0 ? sum(vehicle) / vehicle.length : 0
          //@ts-ignore
          carrier.staff = staff.length > 0 ? sum(staff) / staff.length : 0
          //@ts-ignore
          carrier.accuracy = accuracy.length > 0 ? sum(accuracy) / accuracy.length : 0
          //@ts-ignore
          carrier.hygiene = hygiene.length > 0 ? sum(hygiene) / hygiene.length : 0
          
          const average = vehicle.concat(staff, accuracy, hygiene)
          //@ts-ignore
          carrier.average = average.length > 0 ? sum(average) / average.length : 0
        }
        res.send(carriers);
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.get(this.path + '/:carrierId', validateJOI(schemas.carrierGetById, 'params'), async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        var carrierId = req.params.carrierId;
        const carrier = await carrierRepository.findOne(carrierId, { relations: ["location"] });
        
        if (!carrier.deleted) {
          res.status(200)
          res.send(carrier);
        } else {
          res.status(404);
          res.send("Carrier not found");
        }

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.post(this.path + '/search', validateJOI(schemas.carrierSearch, 'body'), async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        let filterOptions = req.body;
        const carriers = await carrierRepository.find({ name: Like('%' + filterOptions.value + '%') });
        
        if (carriers) {
          res.status(200)
          res.send(carriers);
        } else {
          res.status(404);
          res.send("Carriers not found");
        }
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }

    });

    this.router.post(this.path, [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.carrierPOST, 'body')], async (req, res) => {
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
        res.status(400)
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, [checkJwt, checkRole(["ADMIN", "CARRIER"]), validateJOI(schemas.carrierPUT, 'body')], async (req, res) => {
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
        res.status(400)
        res.send("Error " + e);
      };
    });

    this.router.delete(this.path + '/:carrierId', [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.carrierGetById, 'params')], async (req, res) => {
      try {
        const carrierRepository = getRepository(Carrier);
        var carrierId = req.params.carrierId;
        const carrier = await carrierRepository.findOne(carrierId);
        carrier.deleted = true;
        await carrierRepository.save(carrier);
        
        res.send(200);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });

  }
}
export default CarrierController