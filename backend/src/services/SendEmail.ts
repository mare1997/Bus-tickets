const Email = require('email-templates');

const sendEmail = (pdfPath, order) => {
	const email = new Email({
		message: {
			from: 'radojkovic.marko97@gmail.com',
			attachments: [
				{
					path: pdfPath,
				}
			]
		}
	});
	
	email
		.send({
			template: 'email-template',
			message: {
				to: order.email
			},
			locals: {
				firstName: order.firstName,
				lastName: order.lastName
			}
		})
		.then(console.log)
		.catch(console.error);
}
export { sendEmail }