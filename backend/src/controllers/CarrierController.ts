import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { Carrier } from '../entity/Carrier';
import { getRepository, Like } from 'typeorm';


class CarrierController implements IControllerBase {

    public path = '/carrier'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get(this.path,async (req,res) => 
        {   try{
                const carrierRepository = getRepository(Carrier);
                const carriersFromDB = await carrierRepository.find();
                var carriers = [];
                carriersFromDB.forEach(element => {
                    if(!element.deleted){
                        carriers.push(element);
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(carriers);
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/:carrierId',async (req,res) => 
        {   try{
                const carrierRepository = getRepository(Carrier);
                var carrierId = req.params.carrierId;
                const carrier = await carrierRepository.findOne(carrierId);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!carrier.deleted){
                    res.send(carrier);
                }else{
                    res.status(404);
                    res.send("Carrier not found");
                }

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/filter',async (req,res) =>
        {
            try{
                const carrierRepository = getRepository(Carrier);
                let filterOptions = req.body;
                const carriers = await carrierRepository.find({name: Like('%'+filterOptions.name+'%')});
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(carriers){
                    res.send(carriers);
                }else{
                    res.status(404);
                    res.send("Carriers not found");
                }
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }

        });

        this.router.post(this.path,async (req,res) =>
         {   try{
                const carrierRepository = getRepository(Carrier);
                let carrier = req.body;
                await carrierRepository.save(carrier);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.status(201);
                res.send(carrier);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.put(this.path,async (req,res) =>
         {   try{
                const carrierRepository = getRepository(Carrier);
                let carrier = req.body;
                await carrierRepository.save(carrier);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.status(200);
                res.send(carrier);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

        this.router.delete(this.path + '/:carrierId',async (req,res) =>
         {   try{
                const carrierRepository = getRepository(Carrier);
                var carrierId = req.params.carrierId;
                const carrier = await carrierRepository.findOne(carrierId);
                carrier.deleted = true;
                await carrierRepository.save(carrier);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

    }
}
export default CarrierController