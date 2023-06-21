const express = require('express');

const router = express.Router();

const { users: ctrl } = require('../../controllers');

const { ctrlWrapper, auth, validation, upload } = require('../../middlewares');

const { updateSubscriptionSchema } = require('../../models');

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
	'/',
	auth,
	validation(updateSubscriptionSchema),
	ctrlWrapper(ctrl.patchSubscription)
);

router.patch(
	'/avatars',
	auth,
	upload.single('avatar'),
	// validation(updateSubscriptionSchema),
	ctrl.updateAvatar
);

module.exports = router;
