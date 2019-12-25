import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';
import { Carrier } from '../entity/Carrier';
import { Seats } from '../entity/Seats';
import { Traveling } from '../entity/Traveling';
import { Ticket } from "../entity/Ticket";

class VehicleController implements IControllerBase {

    public path = '/vehicle'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get(this.path,async (req,res) =>
        {   try{
                const vehicleRepository = getRepository(Vehicle);
                const vehicleFromDB = await vehicleRepository.find({ relations: ["carrier"] });
                var vehicles = [];
                vehicleFromDB.forEach(element => {
                    if(!element.deleted){
                        vehicles.push(element);
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(vehicles);
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/:vehicleId',async (req,res) =>
        {   try{
                const vehicleRepository = getRepository(Vehicle);
                var vehicleId = req.params.vehicleId;
                const vehicle = await vehicleRepository.findOne(vehicleId,{ relations: ["carrier"] });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!vehicle.deleted){
                    res.send(vehicle);
                }else{
                    res.send("Vehicle not found",404);
                }

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        /**
         * Get free seats for traveling
         */
        this.router.get(this.path + '/freeseats/:travelingId',async (req,res) =>
        {   try{
                const vehicleRepository = getRepository(Vehicle);
                const travelingRepository = getRepository(Traveling);
                const ticketRepository = getRepository(Ticket);
                const seatsRepository = getRepository(Seats);
                let travelingId = req.params.travelingId;
                const traveling = await travelingRepository.findOne(travelingId,{ relations: ["vehicle","ticket"] });
                const vehicle = await vehicleRepository.findOne(traveling.vehicle.id,{ relations: ["seats"] });
                let seats = await seatsRepository.find({where: {vehicle},relations:["ticket"]});
                let s = [];
                seats.forEach(element => {
                    if(!element.ticket){
                        s.push(element);
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!vehicle.deleted){
                    res.send(s);
                }else{
                    res.send("Bus station not found",404);
                }

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.post(this.path,async (req,res) =>
         {   try{
                const vehicleRepository = getRepository(Vehicle);
                const carrierRepository = getRepository(Carrier);
                const seatsRepository = getRepository(Seats);
                let vehicle = req.body;
                let seats = [];
                for(let i = 1;i <= vehicle.numberSeats;i++){
                    let seat = new Seats();;
                    seat.number = i;
                    seat.deleted = false;
                    await seatsRepository.save(seat);
                    seats.push(seat);
                }
                let carrier = await carrierRepository.findOne(vehicle.carrierId);
                vehicle.carrier = carrier;
                vehicle.seats = seats;
                await vehicleRepository.save(vehicle);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(vehicle,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.put(this.path,async (req,res) =>
         {   try{
                const vehicleRepository = getRepository(Vehicle);
                const carrierRepository = getRepository(Carrier);
                let vehicle = req.body;
                if(vehicle.carrierId){
                    let carrier = await carrierRepository.findOne(vehicle.carrierId);
                    vehicle.carrier = carrier;
                }
                await vehicleRepository.save(vehicle);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(vehicle,200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.delete(this.path + '/:vehicleId',async (req,res) =>
         {   try{
                const vehicleRepository = getRepository(Vehicle);
                var vehicleId = req.params.vehicleId;
                const vehicle = await vehicleRepository.findOne(vehicleId);
                vehicle.deleted = true;
                await vehicleRepository.save(vehicle);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
    }
}
export default VehicleController