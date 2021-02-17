//Required package
import { getRepository } from 'typeorm';
import { BusStation } from '../entity/BusStation';
import { Station } from '../entity/Station';
import { Traveling } from '../entity/Traveling';
import { Vehicle } from '../entity/Vehicle';

var pdf = require('pdf-creator-node');
var fs = require('fs');

const getDate = date => {
	const time = new Date(date)
	const day = time ? time.getDate() : ''
	const month = time ? time.getMonth() + 1 : ''
	const year = time ? time.getFullYear() : ''
	const hour = time ? time.getHours() : ''
	const minute = time ? time.getMinutes() : ''
	const formattedHour = ('0' + hour).slice(-2)
	const formattedMinute = ('0' + minute).slice(-2)
	return day + '/' + month + '/' + year + '  ' + formattedHour + ':' + formattedMinute
}

const prepareData = async order => {
	const travelingRepository = getRepository(Traveling);
	const vehicleRepository = getRepository(Vehicle);
	const stationRepository = getRepository(Station);
  const busStationRepository = getRepository(BusStation);
	
	const traveling = await travelingRepository.findOne(order.travelingId, { relations: ["vehicle", "station", "ticket"] });
	const vehicle = await vehicleRepository.findOne(traveling.vehicle.id, { relations: ["carrier"] });
	const carrier = vehicle.carrier
	for (const station of traveling.station) {
		const fullStation = await stationRepository.findOne(station.id, { relations: ["busStation"] });
		const busStation = await busStationRepository.findOne(fullStation.busStation.id, { relations: ["location"] });
		station.busStation = busStation
	}
	
	return {
		id: order.id,
		start: traveling.station[0].busStation.location.name,
		finish: traveling.station[traveling.station.length - 1].busStation.location.name,
		busStation: traveling.station[0].busStation.name,
		carrier: carrier.name,
		date: getDate(traveling.date),
		amount: order.amount,
		currency: order.currency,
		vehicleRegNum: vehicle.registration_number,
		firstName: order.firstName,
		lastName: order.lastName
	}	
}
const createPdfs = async (order, data) => {
	const html = fs.readFileSync('/home/marko/Diplomski/Bus-tickets/backend/src/services/template.html', 'utf8');
	const options = {
		format: "A5",
		orientation: "landscape",
		border: "5mm",
		header: {
			height: "10mm",
			contents: '<div style="text-align: center;">Ticket</div>'
		},
		footer: {
			height: "5mm",
			contents: '<div style="text-align: left;">By BusTickets.com</div>'
		}
	}
	for (const ticket of order.tickets) {
		data.ticketId = ticket.id
		data.seat = ticket.seats.number

		const document = {
			html: html,
			data: {
				data: data
			},
			path: `/home/marko/Diplomski/Bus-tickets/backend/src/pdfs/ticket${data.id}-${ticket.id}.pdf`
		}
		try {
			const res = await pdf.create(document, options)
			console.log('Pdf created', res)	
		} catch (error) {
			console.log('Bug:', error)
		}
	}
} 
export {createPdfs, prepareData}
