const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
	const { _id } = req.user; // id пользователя , который обновляет аватарку
	// const { path: tempUpload, originalname } = req.file; // извлекаем из пришедших данных в какой папке сохранен,и имя файла
	// const filename = `${_id}_${originalname}`; // создаем имя файла из id user и название файла авы
	// const resultUpload = path.join(avatarsDir, filename); // dir public+ file name
	// await fs.rename(tempUpload, resultUpload); // remove  temp=> public
	// const avatarURL = path.join('avatars', filename); // crete var dir+ file name for ref
	// await User.findByIdAndUpdate(_id, { avatarURL }); // обновляем поле с ссылкой на аватарку , на загруженную
	// res.json({
	// 	avatarURL,
	// });
	// const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
	// if (!result) {
	// 	throw HttpError(404, 'Not found');
	// } else {
	// 	res.json(result);
	// }
};

module.exports = updateAvatar;
