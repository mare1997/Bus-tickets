import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository, Like } from 'typeorm';
import { BusStation } from '../entity/BusStation';
import { Location } from '../entity/Location';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
class BusStationController implements IControllerBase {

  public path = '/busstation'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path, async (req, res) => {
      try {
        const busstationRepository = getRepository(BusStation);
        const bstationsFromDB = await busstationRepository.find({ relations: ["location"] });
        var bstations = [];
        bstationsFromDB.forEach(element => {
          if (!element.deleted) {
            bstations.push(element);
          }
        });

        res.send(bstations);
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.get(this.path + '/:busstationId', validateJOI(schemas.busStationGetById, 'params'), async (req, res) => {
      try {
        const busstationRepository = getRepository(BusStation);
        var busstationId = req.params.busstationId;
        const busstation = await busstationRepository.findOne(busstationId, { relations: ["location"] });

        if (!busstation.deleted) {
          res.send(busstation);
        } else {
          res.status(404);
          res.send("Bus station not found");
        }

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.post(this.path + '/search', validateJOI(schemas.busStationSearch, 'body'), async (req, res) => {
      try {
        const busstationRepository = getRepository(BusStation);
        let filterOptions = req.body;
        const stations = await busstationRepository.find({ name: Like('%' + filterOptions.value + '%') });
        
        if (stations) {
          res.send(stations);
        } else {
          res.status(404);
          res.send("Bus station not found");
        }
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }

    });
    this.router.post(this.path, [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.busStationPOST, 'body')], async (req, res) => {
      try {
        const busstationRepository = getRepository(BusStation);
        const locationRepository = getRepository(Location);
        let busstation = req.body;
        let location = await locationRepository.findOne(busstation.locationId);
        busstation.location = location;
        await busstationRepository.save(busstation);

        res.status(201);
        res.send(busstation);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.busStationPUT, 'body')], async (req, res) => {
      try {
        const busstationRepository = getRepository(BusStation);
        const locationRepository = getRepository(Location);
        let busstation = req.body;
        let location = await locationRepository.findOne(busstation.locationId);
        busstation.location = location;
        await busstationRepository.save(busstation);

        res.status(200);
        res.send(busstation);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });
    this.router.delete(this.path + '/:busstationId', [checkJwt, checkRole(["ADMIN"]), validateJOI(schemas.busStationGetById, 'params')], async (req, res) => {
      try {
        const busstationRepository = getRepository(BusStation);
        var busstationId = req.params.busstationId;
        const busstation = await busstationRepository.findOne(busstationId);
        busstation.deleted = true;
        await busstationRepository.save(busstation);

        res.send(200);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });
  }
}
export default BusStationController