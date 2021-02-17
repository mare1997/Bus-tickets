"use strict";
const nodemailer = require("nodemailer");

const addAtachmets = order => {
  let attachments = []
  for(const ticket of order.tickets) {
    attachments.push({
      filename: `ticket${order.id}-${ticket.id}.pdf`,
			path: `/home/marko/Diplomski/Bus-tickets/backend/src/pdfs/ticket${order.id}-${ticket.id}.pdf`
    })
  }
  return attachments
}

async function sendMail(order) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "691526f01609ed",
      pass: "824ab3133d6cd7"
    }
  });
  const message = 
    {
      from: '"BusTickets.com 👻" <radojkovic.marko97@gmail.com>', // sender address
      to: `${order.firstName} ${order.lastName}, ${order.email}`, // list of receivers
      subject: `Hi ${order.firstName}, thanks for shopping at BusTickets.com`, // Subject line
      html: 
        `<p> Hi mr/ms/mrs ${order.firstName} ${order.lastName},</p>
        <p>Your order has been successfully placed.</p>
        <p> Your ticket can be found in the attachment of this email in pdf format.</p>`, // html body
      attachments: addAtachmets(order)
    }
  try {
    const info = await transporter.sendMail(message);
  } catch (error) {
    console.log('Bug', error);
  }
}
export { sendMail }