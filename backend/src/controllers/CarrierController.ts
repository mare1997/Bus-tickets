import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { Carrier } from '../entity/Carrier';
import { getRepository } from 'typeorm';


class CarrierContoller implements IControllerBase {

    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get('/carrier',async (req,res) => 
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
        this.router.get('/carrier/:carrierId',async (req,res) => 
        {   try{
                const carrierRepository = getRepository(Carrier);
                var carrierId = req.params.carrierId;
                const carrier = await carrierRepository.findOne(carrierId);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!carrier.deleted){
                    res.send(carrier);
                }else{
                    res.send("Carrier not found",404);
                }
                
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });

        this.router.post('/carrier',async (req,res) =>
         {   try{
                const carrierRepository = getRepository(Carrier);
                let carrier = req.body;
                await carrierRepository.save(carrier);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(carrier,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.put('/carrier',async (req,res) =>
         {   try{
                const carrierRepository = getRepository(Carrier);
                let carrier = req.body;
                
                await carrierRepository.save(carrier);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(carrier,200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

        this.router.delete('/carrier/:carrierId',async (req,res) =>
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
export default CarrierContoller