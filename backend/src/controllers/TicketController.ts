import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Ticket } from '../entity/Ticket';
import { Passenger } from '../entity/Passenger';
import { UserCustomRepository } from '../repositories/UserCustomRepository';
import { User } from '../entity/User';
import { Seats } from '../entity/Seats';
import { Traveling } from '../entity/Traveling';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'

class TicketController implements IControllerBase {
	public path = '/ticket'
	public router = express.Router()

	constructor() {
		this.initRoutes()
	}
	public initRoutes() {
		this.router.get(this.path + '/:ticketId', validateJOI(schemas.ticketGetByTicketId, 'paramas'), async (req, res) => {
			try {
				const ticketRepository = getRepository(Ticket);
				var ticketId = req.params.ticketId;
				const ticket = await ticketRepository.findOne(ticketId, { relations: ["seats", "traveling", "passenger"] });
				if (!ticket.deleted) {
					res.status(200)
					res.send(ticket);
				} else {
					res.status(404);
					res.send("Ticket not found");
				}

			} catch (e) {
				res.status(400)
				res.send("Error " + e);
			}
		});
		this.router.get(this.path + '/traveling/:travelingId', validateJOI(schemas.ticketGetByTravelingId, 'paramas'), async (req, res) => {
			try {
				const ticketRepository = getRepository(Ticket);
				var travelingId = req.params.travelingId;
				const tickets = await ticketRepository.find({ relations: ["seats", "traveling", "passenger"] });
				let ticketsOfTavel = [];
				tickets.forEach(element => {
					if (element.traveling.id == +travelingId) {
						if (!element.deleted) {
							ticketsOfTavel.push(element);
						}
					}
				});
				res.status(200)
				res.send(ticketsOfTavel);

			} catch (e) {
				res.status(400)
				res.send("Error " + e);
			}
		});
		this.router.post(this.path, validateJOI(schemas.ticketPOST, 'body'), async (req, res) => {
			try {
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
				if (user.id) {
					passenger.user = user;
				} else {
					passenger.name = user;
				}
				await passengerRepository.save(passenger);
				ticket.passenger = passenger;
				ticket.seats = seat;
				ticket.traveling = traveling;
				await ticketRepository.save(ticket);
				res.status(201);
				res.send(ticket);

			} catch (e) {
				res.status(400)
				res.send("Error " + e);
			}

		});
		this.router.delete(this.path + '/:ticketId', validateJOI(schemas.ticketGetByTicketId, 'paramas'), async (req, res) => {
			try {
				const ticketRepository = getRepository(Ticket);
				var ticketId = req.params.ticketId;
				const ticket = await ticketRepository.findOne(ticketId);
				ticket.deleted = true;
				ticket.passenger.deleted = true;
				await ticketRepository.save(ticket);
				res.status(200)
				res.send(200);

			} catch (e) {
				res.status(400)
				res.send("Error " + e);
			};
		});

	}
}
export default TicketController