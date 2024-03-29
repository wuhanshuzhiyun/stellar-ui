const express = require('express');
const router = express.Router();
const Data = require('./utils/Data.js');
const Code = require('./utils/Code.js');
const WeiXin = require('./utils/WeiXin.js');

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
			res.send({ code: 400, message: '验证码错误' });
			return;
		}
		await WeiXin.sensitiveWords(`${content} ${user}`);
		const data = await Data.setData(name, { content, user });
		res.send({ code: 0, data });
	} catch (error) {
		next(error);
	}
});

router.get('/openid', async (req, res, next) => {
	try {
		const openid = await WeiXin.getOpenid(req.query.code);
		res.send({ code: 0, data: openid });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
