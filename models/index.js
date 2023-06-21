const { Contact, schemas } = require('./contact');
const {
	registerSchema,
	loginSchema,
	User,
	updateSubscriptionSchema,
} = require('./users');

module.exports = {
	Contact,
	User,
	schemas,
	registerSchema,
	loginSchema,
	updateSubscriptionSchema,
};
