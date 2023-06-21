const { Contact } = require('../../models');
const { HttpError } = require('../../helpers/');

const putById = async (req, res, next) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, 'Not found');
	} else {
		res.json(result);
	}
};
module.exports = putById;
