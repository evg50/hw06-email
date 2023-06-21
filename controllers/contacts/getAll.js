const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
	// console.log('Contact', Contact);
	const { _id } = req.user;
	const { page = 1, limit = 2 } = req.query;
	const { favorite } = req.query;
	const filter = {
		owner: _id,
	};
	const skip = (page - 1) * limit;
	if (favorite) {
		filter.favorite = favorite;
	}
	console.log('filter', filter);
	const result = await Contact.find(filter, '', {
		skip,
		limit: +limit,
	}).populate('owner', '_id name email');

	res.json({
		status: 'succes',
		code: 200,
		data: {
			result,
		},
	});
};

module.exports = getAll;
