import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Traveling } from '../entity/Traveling';
import { Vehicle } from '../entity/Vehicle';
import { Carrier } from '../entity/Carrier';
import { Seats } from '../entity/Seats';
import { Station } from '../entity/Station';
import { Ticket } from '../entity/Ticket';
import { BusStation } from '../entity/BusStation';
import { Location } from '../entity/Location';

class TravelingController implements IControllerBase {
  public path = '/traveling'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    // this.router.get(this.path, async (req, res) => {
    // 	try {
    // 		const travelingRepository = getRepository(Traveling);
    // 		const travelingFromDB = await travelingRepository.find({ relations: ["vehicle", "station", "ticket"] });
    // 		var traveling = [];
    // 		travelingFromDB.forEach(element => {
    // 			if (!element.deleted) {
    // 				traveling.push(element);
    // 			}
    // 		});

    // 		res.send(traveling);
    // 	} catch (e) {

    // 		res.send("Error " + e);
    // 	}
    // });
    // this.router.get(this.path + '/:travelingId', async (req, res) => {
    // 	try {
    // 		const travelingRepository = getRepository(Traveling);
    // 		var travelingId = req.params.vehicleId;
    // 		const traveling = await travelingRepository.findOne(travelingId, { relations: ["vehicle", "station", "ticket"] });

    // 		if (!traveling.deleted) {
    // 			res.send(traveling);
    // 		} else {
    // 			res.status(404);
    // 			res.send("Bus station not found");
    // 		}

    // 	} catch (e) {

    // 		res.send("Error " + e);
    // 	}
    // });
    this.router.post(this.path + '/search', async (req, res) => {
      const travelingRepository = getRepository(Traveling);
      const stationRepository = getRepository(Station);
      const busStationRepository = getRepository(BusStation);
      const vehicleRepository = getRepository(Vehicle);
      const carrierRepository = getRepository(Carrier);
      let travels = await travelingRepository.find({ relations: ["vehicle", "station", "ticket"] });

      const filterOptions = req.body;
      const dateFromBody = new Date(filterOptions.date)
      let filteredTravels = [];
      let searchedTravels = [];

      travels.forEach(travel => {
        const dateFromTravel = new Date(travel.date)
        if (!travel.deleted && +dateFromTravel >= +dateFromBody) {
          filteredTravels.push(travel);
        }
      })

      for (let i = 0; filteredTravels.length > i; i++) {
        const stationStart = await stationRepository.findOne(filteredTravels[i].station[0].id, { relations: ["busStation"] });
        const busStationStart = await busStationRepository.findOne(stationStart.busStation.id, { relations: ["location"] });
        const stationFinish = await stationRepository.findOne(filteredTravels[i].station[filteredTravels[i].station.length - 1].id, { relations: ["busStation"] });
        const busStationFinish = await busStationRepository.findOne(stationFinish.busStation.id, { relations: ["location"] });
        const startLocation = busStationStart.location.name.toLowerCase()
        const finishLocation = busStationFinish.location.name.toLowerCase()
        if (startLocation.includes(filterOptions.start.toLowerCase()) && finishLocation.includes(filterOptions.finish.toLowerCase())) {
          searchedTravels.push(filteredTravels[i])
        }
      }

      for (let i = 0; searchedTravels.length > i; i++) {
        for (let l = 0; searchedTravels[i].station.length > l; l++) {
          const station = await stationRepository.findOne(searchedTravels[i].station[l].id, { relations: ["busStation"] });
          const busStation = await busStationRepository.findOne(station.busStation.id, { relations: ["location"] });
          searchedTravels[i].station[l].bus_station = busStation
        }
        searchedTravels[i].price = searchedTravels[i].ticket[0].price
        const vehicle = await vehicleRepository.findOne(searchedTravels[i].vehicle.id, { relations: ["carrier"] });
        const carrier = await carrierRepository.findOne(vehicle.carrier.id, { relations: ["location"] });
        searchedTravels[i].carrier = carrier
      }


      res.status(200);
      res.send(searchedTravels);
    });
		/*
		*req.body are travel object with vehicle id and array with stations
		 */
    this.router.post(this.path, async (req, res) => {
      try {
        const travelingRepository = getRepository(Traveling);
        const vehicleRepository = getRepository(Vehicle);
        const stationRepository = getRepository(Station);
        const busStRepository = getRepository(BusStation);
        let traveling = req.body;
        let vehicle = await vehicleRepository.findOne(traveling.vehicleId);
        for (let i = 0; i < traveling.stations.length; i++) {
          let busstration = await busStRepository.findOne(traveling.stations[i].busStationId);
          traveling.stations[i].busStation = busstration;
          await stationRepository.save(traveling.stations[i]);
          traveling.station = traveling.stations;
        }
        traveling.vehicle = vehicle;
        traveling.date = new Date();
        await travelingRepository.save(traveling);

        res.status(201);
        res.send(traveling);

      } catch (e) {

        res.send("Error " + e);
      };
    });/*
        *Not tested.
        */
    this.router.put(this.path, async (req, res) => {
      try {
        const travelingRepository = getRepository(Traveling);
        const vehicleRepository = getRepository(Vehicle);
        const stationRepository = getRepository(Station);
        const busStRepository = getRepository(BusStation);
        let traveling = req.body;
        let vehicle = await vehicleRepository.findOne(traveling.vehicleId);
        for (let i = 0; i < traveling.station.length; i++) {
          let busstration = await busStRepository.findOne(traveling.station[i].busStationId);
          traveling.station[i].busStation = busstration;
          await stationRepository.save(traveling.station[i]);
        }
        traveling.vehicle = vehicle;
        traveling.date = new Date();
        await travelingRepository.save(traveling);

        res.status(200);
        res.send(traveling);

      } catch (e) {

        res.send("Error " + e);
      };
    });
    this.router.delete(this.path + '/:travelingId', async (req, res) => {
      try {
        const travelingRepository = getRepository(Traveling);
        var travelingId = req.params.vehicleId;
        const traveling = await travelingRepository.findOne(travelingId);
        traveling.deleted = true;
        await travelingRepository.save(traveling);

        res.send(200);

      } catch (e) {

        res.send("Error " + e);
      };
    });
  }

}
export default TravelingController
