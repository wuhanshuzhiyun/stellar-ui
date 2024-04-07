const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const Data = require('./utils/Data.js');
const Code = require('./utils/Code.js');
const wx = require('./utils/WeiXin.js');
const User = require('./utils/User.js');

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
		const openid = await Code.checkCode(uuid, code);
		const result = await wx.checkout(`${content} ${user}`, openid);
		if (result.bool) {
			next({ code: 401, message: result.message });
			return;
		}
		const data = await Data.setData(name, { content, user, openid });
		res.send({ code: 0, data });
	} catch (error) {
		next(error);
	}
});

router.get('/islogin', async (req, res, next) => {
	try {
		const { token } = req.query;
		const openid = await User.getOpenidByToken(token);
		return res.send({ code: 0, data: !!openid });
	} catch (error) {
		next(error);
	}
});

router.get('/login', async (req, res, next) => {
	try {
		const { code } = req.query;
		const token = await User.login(code);
		res.send({ code: 0, data: token });
	} catch (error) {
		next(error);
	}
});

router.get('/logout', async (req, res, next) => {
	try {
		const { token } = req.query;
		const result = await User.logout(token);
		res.send({ code: 0, data: result });
	} catch (error) {
		next(error);
	}
});

router.get('/wxcode', async (req, res, next) => {
	try {
		const { uuid } = req.query;
		const filePath = path.join(process.cwd(), `/static/${uuid}.png`);
		if (fs.existsSync(filePath)) {
			res.sendFile(filePath);
			return;
		}
		const result = await wx.getWxacodeunlimit('pages/code/code', uuid, {
			check_path: false,
			width: 280,
		});
		fs.writeFileSync(filePath, result);
		res.sendFile(filePath);
	} catch (error) {
		next(error);
	}
});

router.get('/getwxcode', async (req, res, next) => {
	try {
		const { code, uuid } = req.query;
		if (!code || !uuid) {
			return res.send({ code: 400, msg: '非法调用！' });
		}
		const openid = await wx.getOpenid(code);
		if (!openid) return res.send({ code: 400, msg: '非法调用！' });
		const result = await Code.createCode(uuid, openid);
		res.send({ code: 0, data: result });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
