const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const handleSсhemaValidationErrors = require('./handleSсhemaValidationErrors');
const isValidId = require('./isValidId');
const auth = require('./auth');
const upload = require('./upload');

module.exports = {
	validation,
	ctrlWrapper,
	handleSсhemaValidationErrors,
	isValidId,
	auth,
	upload,
};
