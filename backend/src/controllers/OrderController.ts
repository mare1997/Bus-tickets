import * as express from 'express'
import { getRepository } from 'typeorm';
import { Order } from '../entity/Order';
import { Ticket } from '../entity/Ticket';
import { User } from '../entity/User';
import IControllerBase from "../interfaces/IControllerBase.interface";
import { validateJOI } from '../middleware/validateJOI';
import { schemas } from '../schemas';
import { finalizeOrderStripe } from '../services/Payment'
import { sendMail } from '../services/SendEmail'
import { createPdfs, prepareData} from '../services/CreatePDF'

class OrderController implements IControllerBase {
	public path = '/order'
	public router = express.Router()

	constructor() {
		this.initRoutes()
	}
	public initRoutes() {
		this.router.post(this.path, validateJOI(schemas.orderPOST, 'body'), async (req, res) => {
			try {
        const ticketRepository = getRepository(Ticket);
        const orderRepository = getRepository(Order);
        const userRepository = getRepository(User);
				let order = req.body;
				let user = order.userId ? await userRepository.findOne(order.userId) : null;
        order.user = user
				
				const tickets = await ticketRepository.find({ relations: ["seats", "traveling", "order"] });
				
				const freeTicketsOfTavel = tickets.filter(element => element.traveling.id === +order.travelingId && !element.deleted && !element.order);
				
				if (order.qty > freeTicketsOfTavel.length) {
					res.status(404)
					res.send('This qty is unavailble')
				}

				if (order.additionalData.paymentMethod === 'paypal') {
				 order.amount = order.additionalData.amount
				 order.currency = order.additionalData.currency
				 order.paymentMethod = order.additionalData.paymentMethod
				 order.token = order.additionalData.token
				}
				
        let createdOrder = await orderRepository.save(order);
				
				if (order.tickets) {
					for (let ticket of order.tickets) {
						let ticketFromAT = freeTicketsOfTavel.find(t => t.id === ticket.id)
						ticketFromAT.order = createdOrder
						await ticketRepository.save(ticketFromAT)
					}
				} else {
					createdOrder.tickets = []
					for (let index = 0; index < order.qty; index++) {
						const ticket = freeTicketsOfTavel[index]; 
						ticket.order = order
						const savedTicket = await ticketRepository.save(ticket)
						createdOrder.tickets.push(savedTicket)
					}
				}
				
        
        if (order.additionalData.paymentMethod === 'stripe') {
          const data = {
            amount: order.additionalData.amount,
            currency: order.additionalData.currency,
            stripeToken: order.additionalData.token
          }
					const charge = await finalizeOrderStripe(data)
					order.amount = (+order.additionalData.amount / 100).toString()
					order.currency = order.additionalData.currency
					order.paymentMethod = order.additionalData.paymentMethod
					order.token = charge.id
					createdOrder = await orderRepository.save(order);
        }
				
				try {
					const preparedDataForPdf = await prepareData(createdOrder)
					await createPdfs(createdOrder, preparedDataForPdf)
					await sendMail(createdOrder)
				} catch (error) {
					res.status(404)
					res.send('We have a problem to send you a mail, contact us.' + error)
				}
				delete createdOrder.tickets
				res.status(201);
				res.send(createdOrder);
			} catch (e) {
				res.status(400)
				res.send("Error " + e);
			}
		});
	}
}
export default OrderController