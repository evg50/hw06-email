const { Contact } = require('../../models');

const getById = async (req, res, next) => {
	const { id } = req.params;
	console.log('id', id);
	const result = await Contact.findById(id);

	res.json(result);
};
module.exports = getById;
