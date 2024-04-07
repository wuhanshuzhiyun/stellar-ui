const WX = require('wx-sensitive-words');

const wxConfig = require('./getConfig')('wx');

const wx = new WX(wxConfig.appid, wxConfig.secret, wxConfig.env_version);

module.exports = wx;
