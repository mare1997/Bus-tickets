import * as express from 'express'
import { UserCustomRepository } from '../repositories/UserCustomRepository';
import {getCustomRepository} from "typeorm";
import {User} from "../entity/User";
import IControllerBase from '../interfaces/IControllerBase.interface'
import Database from "../services/Database";


class UserContoller implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get('/users',async (req,res) =>
         {   try{
                const userRepository=Database.getUserCustomRepository();
                let users = await userRepository.find();
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(users);
            }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
         });
         this.router.get('/login',async (req,res) =>
         {   try{
                const userRepository=Database.getUserCustomRepository();
                let user = req.body;
                let findUser = await userRepository.getUserByUsername(user.userName);
                if(findUser && findUser.password  == user.password){
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    res.send(findUser);
                }else{
                    throw new Error('Username or password is not currect');
                }
            }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
          });

         this.router.post('/register',async (req,res) =>
         {   try{
                const userRepository=Database.getUserCustomRepository();
                let user = req.body;
                let findUser = await userRepository.getUserByUsername(user.userName);
                if(findUser){
                    throw new Error('User with that username exist');
                }
                await userRepository.save(user);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(user,201);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

    }


}
export default UserContoller