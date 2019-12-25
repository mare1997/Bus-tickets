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

class TravelingController implements IControllerBase {
    public path = '/traveling'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get(this.path,async (req,res) =>
        {   try{
                const travelingRepository = getRepository(Traveling);
                const travelingFromDB = await travelingRepository.find({ relations: ["vehicle","station","ticket"] });
                var traveling = [];
                travelingFromDB.forEach(element => {
                    if(!element.deleted){
                        traveling.push(element);
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(traveling);
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/:travelingId',async (req,res) =>
        {   try{
                const travelingRepository = getRepository(Traveling);
                var travelingId = req.params.vehicleId;
                const traveling = await travelingRepository.findOne(travelingId,{ relations: ["vehicle","station","ticket"] });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!traveling.deleted){
                    res.send(traveling);
                }else{
                    res.send("Bus station not found",404);
                }

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/filter/traveling',async (req,res) =>{
            const travelingRepository = getRepository(Traveling);
            let filterOptions = req.body;
            let travels = await travelingRepository.find({relations: ["vehicle","station"] });
            let filteredTravels = [];
            travels.forEach(element => {
                if(!element.deleted && element.date == filterOptions.date && element.station[0] == filterOptions.start
                     && element.station[element.station.length-1] == filterOptions.finish){
                        filterOptions.push(element);
                }
            });
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(filteredTravels,200);
        });
        /*
        *req.body are travel object with vehicle id and array with stations
         */
        this.router.post(this.path,async (req,res) =>
         {   try{
                const travelingRepository = getRepository(Traveling);
                const vehicleRepository = getRepository(Vehicle);
                const stationRepository = getRepository(Station);
                const busStRepository = getRepository(BusStation);
                let traveling = req.body;
                let vehicle = await vehicleRepository.findOne(traveling.vehicleId);
                for(let i = 0;i < traveling.stations.length;i++){
                    let busstration = await busStRepository.findOne(traveling.stations[i].busStationId);
                    traveling.stations[i].busStation = busstration;
                    await stationRepository.save(traveling.stations[i]);
                    traveling.station = traveling.stations;
                }
                traveling.vehicle  = vehicle;
                traveling.date = new Date();
                await travelingRepository.save(traveling);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(traveling,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });/*
        *Not tested.
        */
        this.router.put(this.path,async (req,res) =>
         {   try{
            const travelingRepository = getRepository(Traveling);
            const vehicleRepository = getRepository(Vehicle);
            const stationRepository = getRepository(Station);
            const busStRepository = getRepository(BusStation);
            let traveling = req.body;
            let vehicle = await vehicleRepository.findOne(traveling.vehicleId);
            for(let i = 0;i < traveling.station.length;i++){
                let busstration = await busStRepository.findOne(traveling.station[i].busStationId);
                traveling.station[i].busStation = busstration;
                await stationRepository.save(traveling.station[i]);
            }
            traveling.vehicle  = vehicle;
            traveling.date = new Date();
            await travelingRepository.save(traveling);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(traveling,200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.delete(this.path + '/:travelingId',async (req,res) =>
         {   try{
                const travelingRepository = getRepository(Traveling);
                var travelingId = req.params.vehicleId;
                const traveling = await travelingRepository.findOne(travelingId);
                traveling.deleted = true;
                await travelingRepository.save(traveling);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
    }

}
export default TravelingController
