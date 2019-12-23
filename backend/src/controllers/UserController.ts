import * as express from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import Database from "../services/Database";


class UserContoller implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get('/user',async (req,res) =>
         {   try{
                const userRepository=Database.getUserCustomRepository();
                let usersFromDB = await userRepository.find();
                let users = [];
                usersFromDB.forEach(element => {
                    if(!element.deleted){
                        users.push(element);
                    }
                });
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
        this.router.put('/user',async (req,res) =>
         {   try{
                const userRepository=Database.getUserCustomRepository();
                let user = req.body;
                await userRepository.save(user);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(user,200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });
        this.router.delete('/user/:userId',async (req,res) =>
         {   try{
                const userRepository = Database.getUserCustomRepository();
                var userId = req.params.userId;
                const user = await userRepository.findOne(userId);
                user.deleted = true;
                await userRepository.save(user);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

    }


}
export default UserContoller