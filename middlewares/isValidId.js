const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');
const isValidId = (req, _, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		// console.log('error,  id is not correct format');
		next(HttpError(400, `${id} is not valid id`));
	}
	next();
};

module.exports = isValidId;
