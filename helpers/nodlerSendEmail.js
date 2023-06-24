const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
	host: 'smtp.meta.ua',
	port: 465, //25, 465, 2525
	secure: true,
	auth: {
		user: 'testsendemail@meta.ua',
		pass: META_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
	to: 'kinedav149@huvacliq.com',
	from: 'testsendemail@meta.ua',
	subject: 'Test email',
	html: '<p><strong>Test email</strong> from localhost:3000</p>',
};
const sendEmail = async (data) => {
	// email.to = data.email;
	transport
		.sendMail({ ...email, to: data.email })
		.then(() => console.log('Email send success'))
		.catch((error) => console.log(error.message));
};

module.exports = sendEmail;
