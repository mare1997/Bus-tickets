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
        this.router.get('/',async (req,res) => 
        {   try{
                const carrierRepository = getRepository(Carrier);
                const carriers = await carrierRepository.find();
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
                res.send(carrier);
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });

        this.router.post('/carrier',async (req,res) =>
         {   try{
                const carrierRepository = getRepository(Carrier);
                let carrier = req.body;
                // let findUser = await carrierRepository.findOne();
                // if(findUser){
                //     throw new Error('');
                // }
                await carrierRepository.save(carrier);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(carrier,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
    }
}
export default CarrierContoller