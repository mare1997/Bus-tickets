const Joi = require('joi') 
export const schemas = { 
  userPOST: Joi.object({ 
    userName: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().required(),
    phone: Joi.string().required(),
    locationId: Joi.number().integer().required(),
    carrierId: Joi.number() || null,
    role: Joi.string().required()
  }),
  userPUT: Joi.object({ 
    userName: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    id: Joi.number().integer().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    age: Joi.number().integer().required(),
    locationId: Joi.number().integer().required(),
    carrierId: Joi.number() || null,
    role: Joi.string().required()
  }),
  userGetByUserId: Joi.object({ 
    userId: Joi.number().required() 
  }) ,
  busStationGetById: Joi.object({ 
    busstationId: Joi.number().required() 
  }),
  busStationSearch: Joi.object({ 
    value: Joi.string().required() 
  }),
  busStationPOST: Joi.object({ 
    name: Joi.string().required(),
    worktime: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    latitude: Joi.number().integer().required(),
    longitude: Joi.number().integer().required(),
    locationId: Joi.number().integer().required()
  }),
  busStationPUT: Joi.object({
    id: Joi.number().integer().required(), 
    name: Joi.string().required(),
    worktime: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    latitude: Joi.number().integer().required(),
    longitude: Joi.number().integer().required(),
    locationId: Joi.number().integer().required()
  }),
  locationGetById: Joi.object({ 
    locationId: Joi.number().required() 
  }),
  locationPOST: Joi.object({ 
    name: Joi.string().required(),
    zip_code: Joi.string().required()
  }),
  locationPUT: Joi.object({
    id: Joi.number().integer().required(), 
    name: Joi.string().required(),
    zip_code: Joi.string().required()
  }),
  carrierGetById: Joi.object({ 
    carrierId: Joi.number().required() 
  }),
  carrierSearch: Joi.object({ 
    value: Joi.string().required() 
  }),
  carrierPOST: Joi.object({ 
    name: Joi.string().required(),
    pib: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    site: Joi.string().required(),
    locationId: Joi.number().integer().required()
  }),
  carrierPUT: Joi.object({
    id: Joi.number().integer().required(), 
    name: Joi.string().required(),
    pib: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    site: Joi.string().required(),
    locationId: Joi.number().integer().required()
  }),
  vehicleGetByVhicleId: Joi.object({ 
    vehicleId: Joi.number().required() 
  }),
  vehicleGetByCarrierId: Joi.object({ 
    carrierId: Joi.number().required() 
  }),
  vehicleGetByTravelingId: Joi.object({ 
    travelingId: Joi.number().required() 
  }),
  vehiclePOST: Joi.object({ 
    registration_number: Joi.string().required(),
    driver: Joi.string().required(),
    carrierId: Joi.number().integer().required(),
    numberSeats: Joi.number().integer().required()
  }),
  vehiclePUT: Joi.object({
    id: Joi.number().integer().required(), 
    registration_number: Joi.string().required(),
    driver: Joi.string().required(),
    carrierId: Joi.number().integer().required(),
  }),
  travelingGetById: Joi.object({ 
    travelingId: Joi.number().required() 
  }),
  travelingGetByBusId: Joi.object({ 
    busId: Joi.number().required() 
  }),
  travelingSearch: Joi.object({ 
    date: Joi.string().required(),
    start: Joi.string().required(),
    finish: Joi.string().required(),
  }),
  travelingPOST: Joi.object({ 
    vehicleId: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    date: Joi.string().required(),
    isPopularDestination: Joi.boolean().required(),
    stations: Joi.array()
  }),
  travelingPUT: Joi.object({
    id: Joi.number().integer().required(), 
    vehicleId: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    isPopularDestination: Joi.boolean().required(),
    date: Joi.string().required()
  }),
  commentGetByCommentId: Joi.object({ 
    commentId: Joi.number().required() 
  }),
  commentGetByCarrierId: Joi.object({ 
    carrierId: Joi.number().required() 
  }),
  commentPOST: Joi.object({ 
    date: Joi.string().required(),
    fullname: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    carrierId:  Joi.number().required(),
    userId:  Joi.number().required()
  }),
  commentPUT: Joi.object({
    id: Joi.number().integer().required(), 
    date: Joi.string().required(),
    fullname: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    carrierId:  Joi.number().required(),
    userId:  Joi.number().required()
  }),
  reviewGetByCarrierId: Joi.object({ 
    carrierId: Joi.number().required() 
  }),
  reviewPOST: Joi.object({ 
    rollingStock: Joi.number().required(),
    staff: Joi.number().required(),
    accuracy: Joi.number().required(),
    hygiene: Joi.number().required(),
    carrierId:  Joi.number().required(),
    userId:  Joi.number().required()
  }),
  ticketGetByTicketId: Joi.object({ 
    ticketId: Joi.number().required() 
  }),
  ticketGetByTravelingId: Joi.object({ 
    travelingId: Joi.number().required() 
  }),
  ticketPOST: Joi.object({ 
    
  }),
  orderPOST: Joi.object({ 
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    travelingId: Joi.number().required(),
    qty: Joi.number().required(),
    userId: Joi.any(),
    additionalData:  Joi.object({
      paymentMethod: Joi.string().required(),
      token: Joi.string().required(),
      amount: Joi.string().required(),
      currency: Joi.string().required()
    })
  }),
}; 