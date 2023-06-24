const { Schema, model } = require('mongoose');
const Joi = require('joi');
// const { handleSchemaValidationErrors } = require('../middlewares');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},

		email: { type: String, match: emailRegexp, require: true, uniq: true },
		password: { type: String, require: true, minlength: 6 },
		token: {
			type: String,
			default: null,
		},
		subscription: {
			type: String,
			default: 'starter',
			enum: ['starter', 'pro', 'busines'],
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			require: [true, 'Verify token is required'],
		},
		verifyEmail: {
			type: Boolean,
			default: false,
			required: true,
		},
		verificationEmailToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
	},
	{ versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const loginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
// модель для мангуста
const User = model('user', userSchema);

module.exports = {
	User,
	registerSchema,
	loginSchema,
	updateSubscriptionSchema,
};
