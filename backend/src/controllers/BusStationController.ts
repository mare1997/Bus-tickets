import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { BusStation } from '../entity/BusStation';

class BusStationContoller implements IControllerBase {

    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get('/busstation',async (req,res) => 
        {   try{
                const busstationRepository = getRepository(BusStation);
                const bstationsFromDB = await busstationRepository.find();
                var bstations = [];
                bstationsFromDB.forEach(element => {
                    if(!element.deleted){
                        bstations.push(element);
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(bstations);
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get('/busstation/:busstationId',async (req,res) => 
        {   try{
                const busstationRepository = getRepository(BusStation);
                var busstationId = req.params.busstationId;
                const busstation = await busstationRepository.findOne(busstationId);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!busstation.deleted){
                    res.send(busstation);
                }else{
                    res.send("Bus station not found",404);
                }
               
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.post('/busstation',async (req,res) =>
         {   try{
                const busstationRepository = getRepository(BusStation);
                let busstation = req.body;
                
                await busstationRepository.save(busstation);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(busstation,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.put('/busstation',async (req,res) =>
         {   try{
                const busstationRepository = getRepository(BusStation);
                let busstation = req.body;
                
                await busstationRepository.save(busstation);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(busstation,200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.delete('/busstation/:busstationId',async (req,res) =>
         {   try{
                const busstationRepository = getRepository(BusStation);
                var busstationId = req.params.busstationId;
                const busstation = await busstationRepository.findOne(busstationId);
                busstation.deleted = true;
                await busstationRepository.save(busstation);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
    }
}
export default BusStationContoller