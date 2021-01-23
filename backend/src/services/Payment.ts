
const finalizeOrderStripe = async (data) => {
  // Set your secret key. Remember to switch to your live secret key in production.
	// See your keys here: https://dashboard.stripe.com/account/apikeys
	const stripe = require('stripe')('sk_test_51HToNlBJ6JLvaHzMO80xcWvzW7nd8qOeSvLxmE6FmkWM2mi96c4137Fjva7QECnCqvWyQbebZWX6xjxUKNsKBKGH00cyHRfyf7');

	// Token is created using Stripe Checkout or Elements!
	// Get the payment token ID submitted by the form:
	const token = data.stripeToken; // Using Express

	const charge = await stripe.charges.create({
		amount: data.amount,
		currency: data.currency,
		description: 'Charge',
		source: token,
	});
}
export { finalizeOrderStripe }