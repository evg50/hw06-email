/* извлекает из заголовка токен и :
  1 проверяет валидность токена ( то есть что мы его выдали и он не истек)
  2 извелкает из токена ID ,
   находит пользователся в базе по id  и прикрепляет его к запросу ( req.user)

*/

/*
1 Извлечь из заголовка  запрос  содержимое Authorization
2 разделить его на две части , 
3 проверить первое слово bearer  
4 второе сам токен , если токен не валиден присвоить статус 401 , выкинуть ошибку
5 извлечь из токена ID и найти пользователя в базе 
6 прикрепить id в req.user
*/
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const { User } = require('../models/users');
const { SECRET_KEY } = process.env;
// const { sendEmail } = require('../helpers/nodlerSendEmail');
const auth = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer') {
		throw new Unauthorized('Not authorized, Bearer');
	}
	try {
		const { id } = jwt.verify(token, SECRET_KEY);

		const user = await User.findById(id);

		// console.log('user.token', user.token);
		// console.log('user', user);
		if (!user || !user.token) {
			throw new Unauthorized('Not authorized');
		}

		req.user = user;
		next();
	} catch (error) {
		if (error.message === 'Invalid signature') {
			error.status = 401;
		}
		next(error);
	}
};

module.exports = auth;
