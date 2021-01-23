import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Ticket } from '../entity/Ticket';
import { Order } from '../entity/Order';
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
				const ticket = await ticketRepository.findOne(ticketId, { relations: ["seats", "traveling", "Order"] });
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
				const travelingId = req.params.travelingId;
				const tickets = await ticketRepository.find({ relations: ["seats", "traveling", "Order"] });
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
				const OrderRepository = getRepository(Order);
				const userRepository = getRepository(User);
				const seatsRepository = getRepository(Seats);
				const travelingRepository = getRepository(Traveling);
				let ticket = req.body;
				let seat = ticket.seatId ? await seatsRepository.findOne(ticket.seatId) : null;
				let traveling = ticket.travelingId ? await travelingRepository.findOne(ticket.travelingId) : null;
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
				ticket.order.deleted = true;
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