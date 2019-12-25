import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Ticket } from '../entity/Ticket';
import { Passenger } from '../entity/Passenger';
import { UserCustomRepository } from '../repositories/UserCustomRepository';
import { User } from '../entity/User';
import { Seats } from '../entity/Seats';
import { Traveling } from '../entity/Traveling';

class TicketController implements IControllerBase{
    public path = '/ticket'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get(this.path + '/:ticketId',async (req,res) =>
        {   try{
                const ticketRepository = getRepository(Ticket);
                var ticketId = req.params.ticketId;
                const ticket = await ticketRepository.findOne(ticketId,{ relations: ["seats","traveling","passenger"] });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                if(!ticket.deleted){
                    res.send(ticket);
                }else{
                    res.send("Ticket not found",404);
                }

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.get(this.path + '/traveling/:travelingId',async (req,res) =>
        {   try{
                const ticketRepository = getRepository(Ticket);
                var travelingId = req.params.travelingId;
                const tickets = await ticketRepository.find({ relations: ["seats","traveling","passenger"] });
                let ticketsOfTavel = [];
                tickets.forEach(element => {
                    if(element.traveling.id == travelingId){
                        if(!element.deleted){
                            ticketsOfTavel.push(element);
                        }
                    }
                });
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(ticketsOfTavel);

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }
        });
        this.router.post(this.path,async (req,res) =>
        {   try{
                const ticketRepository = getRepository(Ticket);
                const passengerRepository = getRepository(Passenger);
                const userRepository = getRepository(User);
                const seatsRepository = getRepository(Seats);
                const travelingRepository = getRepository(Traveling);
                let ticket = req.body;
                let seat = ticket.seatId ? await seatsRepository.findOne(ticket.seatId) : null;
                let user = ticket.userName ? ticket.userName : await userRepository.findOne(ticket.userId);
                let traveling = ticket.travelingId ? await travelingRepository.findOne(ticket.travelingId) : null;
                let passenger = new Passenger();
                if(user.id){
                    passenger.user = user;
                }else{
                    passenger.name = user;
                }
                await passengerRepository.save(passenger);
                ticket.passenger = passenger;
                ticket.seats = seat;
                ticket.traveling = traveling;
                await ticketRepository.save(ticket);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(ticket,201);

            }catch(e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
            }

        });
        this.router.delete(this.path + '/:ticketId',async (req,res) =>
         {   try{
                const ticketRepository = getRepository(Ticket);
                var ticketId = req.params.ticketId;
                const ticket = await ticketRepository.findOne(ticketId);
                ticket.deleted = true;
                ticket.passenger.deleted = true;
                await ticketRepository.save(ticket);
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(200);

             }catch (e){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send("Error " + e);
             };
        });

    }
}
export default TicketController