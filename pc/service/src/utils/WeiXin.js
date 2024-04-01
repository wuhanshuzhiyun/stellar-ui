const WX = require('wx-sensitive-words');
const wxConfig = require('./getConfig')('wx');

const wx = new WX(wxConfig.appid, wxConfig.secret);

module.exports = wx;
