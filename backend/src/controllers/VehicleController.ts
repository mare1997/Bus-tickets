import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';
import { Carrier } from '../entity/Carrier';

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
                let vehicle = req.body;
                let carrier = await carrierRepository.findOne(vehicle.carrierId);
                vehicle.carrier = carrier;
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