const express = require('express');
const router = express.Router();
const Data = require('./utils/Data.js');
const Code = require('./utils/Code.js');

router.get('/code', async (req, res, next) => {
	try {
		const result = await Code.getCode();
		res.send({ code: 0, data: result });
	} catch (error) {
		next(error);
	}
});

router.get('/list', async (req, res, next) => {
	const { name } = req.query;
	try {
		const data = await Data.getData(name);
		res.send({ code: 0, data });
	} catch (error) {
		next(error);
	}
});

router.post('/create', async (req, res, next) => {
	const { name, content, user, code, uuid } = req.body;
	try {
		const bool = await Code.checkCode(uuid, code);
		if (!bool) {
			res.send({ code: 400, messgae: '验证码错误' });
			return;
		}
		const data = await Data.setData(name, { content, user });
		res.send({ code: 0, data });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
