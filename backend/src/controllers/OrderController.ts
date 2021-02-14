import * as express from 'express'
import { getRepository } from 'typeorm';
import { Order } from '../entity/Order';
import { Ticket } from '../entity/Ticket';
import { Traveling } from '../entity/Traveling';
import { User } from '../entity/User';
import IControllerBase from "../interfaces/IControllerBase.interface";
import { validateJOI } from '../middleware/validateJOI';
import { schemas } from '../schemas';
import { finalizeOrderStripe } from '../services/Payment'
import { sendEmail } from '../services/SendEmail'
import { createPdf } from '../services/CreatePDF'
class OrderController implements IControllerBase {
	public path = '/order'
	public router = express.Router()

	constructor() {
		this.initRoutes()
	}
	public initRoutes() {
		this.router.post(this.path, validateJOI(schemas.orderPOST, 'body'), async (req, res) => {
			try {
        // const ticketRepository = getRepository(Ticket);
        // const orderRepository = getRepository(Order);
        // const userRepository = getRepository(User);
				// const travelingRepository = getRepository(Traveling);
				// let order = req.body;
				
        // let user = req.body.userId ? await userRepository.findOne(req.body.userId) : null;
        // const tickets = await ticketRepository.find({ relations: ["seats", "traveling", "order"] });
				// let freeTicketsOfTavel = [];
        // tickets.forEach(element => {
				// 	if (element.traveling.id == +req.body.travelingId) {
				// 		if (!element.deleted && !element.order) {
				// 			freeTicketsOfTavel.push(element);
				// 		}
				// 	}
				// });

				// if (req.body.qty > freeTicketsOfTavel.length) {
				// 	res.status(400).send('This qty is unavailble')
				// }

				// order.user = user
				// if (req.body.additionalData.paymentMethod === 'paypal') {
				//  order.amount = req.body.additionalData.amount
				//  order.currency = req.body.additionalData.currency
				//  order.paymentMethod = req.body.additionalData.paymentMethod
				//  order.token = req.body.additionalData.token
				// }
				
        // let backOrder = await orderRepository.save(order);
        // for (let index = 0; index < req.body.qty; index++) {
				// 	const element = freeTicketsOfTavel[index];
				// 	element.order = order
				// 	ticketRepository.save(element)
				// }
        // // complete paymnet (STRIPE)
        // if (req.body.additionalData.paymentMethod === 'stripe') {
        //   const data = {
        //     amount: req.body.additionalData.amount,
        //     currency: req.body.additionalData.currency,
        //     stripeToken: req.body.additionalData.token
        //   }
				// 	const charge = await finalizeOrderStripe(data)
				// 	order.amount = (+req.body.additionalData.amount / 100).toString()
				// 	order.currency = req.body.additionalData.currency
				// 	order.paymentMethod = req.body.additionalData.paymentMethod
				// 	order.token = charge.id
				// 	backOrder = await orderRepository.save(order);
        // }
				
				//create pdf
				createPdf({ id: 5})
				// send email
				//sendEmail(`../pdfs/${backOrder.id}.pdf`, backOrder)

				res.status(201);
				//res.send(backOrder);
			} catch (e) {
				res.status(400)
				res.send("Error " + e);
			}
		});
	}
}
export default OrderController