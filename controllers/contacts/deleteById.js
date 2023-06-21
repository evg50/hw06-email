const contactsOperations = require('../../models/contact');
const { HttpError } = require('../../helpers/');
const { Contact } = require('../../models');

const deleteById = async (req, res, next) => {
	const { id } = req.params;

	const result = await Contact.findByIdAndDelete(id);
	if (!result) {
		throw HttpError(404, 'Not found');
	} else {
		res.json({
			message: 'Delete success',
		});
	}
};

module.exports = deleteById;
