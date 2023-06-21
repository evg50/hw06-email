const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSсhemaValidationErrors } = require('../middlewares');
const phoneRegexp = /^\((\d{3})\) \d{3}-\d{4}$/;

// схема для монго
const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		phone: {
			type: String,
			unique: true,
			match: phoneRegexp,
		},
		email: {
			type: String,
			unique: [true, 'email must be uniq'],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);
// при сохранении данных в базу испльзуется схема для валидации
contactSchema.post('save', handleSсhemaValidationErrors);

// схема для joi
const addSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().pattern(phoneRegexp),
	email: Joi.string(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
