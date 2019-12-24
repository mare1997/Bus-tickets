import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Location } from '../entity/Location';

class LocationController implements IControllerBase {

    public path = '/location'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get(this.path,async (req,res) => 
        {   try{
                const locationRepository = getRepository(Location);
                const locationFromDB = await locationRepository.find();
                var location = [];
                locationFromDB.forEach(element => {
                    if(!element.deleted){
                        location.push(element);
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(location);
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/:locationId',async (req,res) => 
        {   try{
                const locationRepository = getRepository(Location);
                var locationId = req.params.locationId;
                const location = await locationRepository.findOne(locationId);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!location.deleted){
                    res.send(location);
                }else{
                    res.send("Location not found.",404);
                }
                
            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.post(this.path,async (req,res) =>
         {   try{
                const locationRepository = getRepository(Location);
                let location = req.body;
                
                await locationRepository.save(location);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(location,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.put(this.path,async (req,res) =>
         {   try{
                const locationRepository = getRepository(Location);
                let location = req.body;
                
                await locationRepository.save(location);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(location,200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.delete(this.path + '/:locationId',async (req,res) =>
         {   try{
                const locationRepository = getRepository(Location);
                var locationId = req.params.locationId;
                const location = await locationRepository.findOne(locationId);
                location.deleted = true;
                await locationRepository.save(location);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

    }

}
export default LocationController