const handleSсhemaValidationErrors = (error, data, next) => {
	console.log('error handler');

	// error.status = isConflict(error) ? 409 : 400;
	const { code, name } = error;
	error.status = code === 11000 && name === 'MongoServerError' ? 409 : 400;

	next();
};

module.exports = handleSсhemaValidationErrors;
