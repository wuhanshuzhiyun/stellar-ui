// vue.config.js
module.exports = {
	chainWebpack: (config) => {
		config.resolveLoader.alias.set('file-loader', __dirname + '/node_modules/file-loader');
		config.module.rule('markdown').test(/\.md$/).use('file-loader').loader('file-loader').end();
	},
};
