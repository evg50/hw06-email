const { HttpError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { v4: uuid } = require('uuid');
const sendEmail = require('../../helpers/nodlerSendEmail');
const { User } = require('../../models');

const { SECRET_KEY } = process.env;
// console.log('SECRET_KEY', SECRET_KEY);

const register = async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.findOne({ email });

	// check uniq email and create error if yes
	if (user) {
		throw HttpError(409, 'Email already in use');
	}

	const hashPassword = await bcrypt.hash(password, 10);
	//create new user  and response status and response body

	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		name,
		email,
		password: hashPassword,
		avatarURL,
		verificationEmailToken: uuid(),
	});
	res.status(201).json({
		status: 'success',
		code: 201,
		user: { email, name },
	});
};

// controller login
const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	// проверка наличия в базе полученого email
	// сравнение пароля с хешом в базе , в случае успеха генерация и возврат токена
	if (!user || !bcrypt.compareSync(password, user.password)) {
		throw HttpError(401, `Email or password is wrong`);
	}
	if (!user.verifyEmail) {
		sendEmail(user);
		throw HttpError(401, `Email isn't verify`);
	}
	// create token
	const payload = {
		id: user.id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

	await User.findByIdAndUpdate(user._id, { token });
	// respone token
	res.json({
		status: 'succes',
		code: 200,
		data: { token },
	});
};

// controller logout
const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: null });
	res.status(204).json();
};

module.exports = { register, login, logout };
