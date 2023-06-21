const express = require('express');
const router = express.Router();

const { auth: ctrl } = require('../../controllers');
const {
	validation,
	ctrlWrapper,
	isValidId,
	auth,
} = require('../../middlewares');

const { registerSchema, loginSchema } = require('../../models/');
router.post(
	'/register',
	validation(registerSchema),
	ctrlWrapper(ctrl.register)
);
router.post('/login', validation(loginSchema), ctrlWrapper(ctrl.login));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));

// router.post('/signup', auth, ctrlWrapper(ctrl.register));

module.exports = router;
