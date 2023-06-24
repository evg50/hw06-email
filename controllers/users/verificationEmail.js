// извлечь токен из запроса
// найти такой токен в базе
// если есть ,  то юзеру с єтим токеном изменить свойство emailVerification  : true
// если нет, создать ошибку
// вернуть в ответе emailVerification  : true
const { HttpError } = require('../../helpers');

const { User } = require('../../models');

const verificationEmail = async (req, res) => {
	const { verificationToken } = req.params;

	const user = await User.findOne({
		verificationEmailToken: verificationToken,
	});

	if (!user) {
		throw HttpError(401, `token don't match`);
	}
	const result = await User.findByIdAndUpdate(
		user._id,
		{ verifyEmail: true },
		{ new: true }
	);

	res.status(201).json({
		status: 'success',
		data: {
			email: result.email,
			verifyEmail: result.verifyEmail,
		},
	});
};

module.exports = verificationEmail;
