const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const patchSubscription = async (req, res, next) => {
	const { _id } = req.user;

	const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

	if (!result) {
		throw HttpError(404, 'Not found');
	} else {
		res.json(result);
	}
};

module.exports = patchSubscription;
