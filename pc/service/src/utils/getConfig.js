const path = require('path');
const config = require(path.join(process.cwd(), './config.json'));

module.exports = function (key) {
	if (key) return config[key];
	return config;
};
