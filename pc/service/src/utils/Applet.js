const WX = require('wx-sensitive-words');

const wxConfig = require('./getConfig')('wx');

const Applet = new WX(wxConfig.appid, wxConfig.secret, wxConfig.env_version);

module.exports = Applet;
