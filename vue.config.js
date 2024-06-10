// vue.config.js
const TransformPages = require('uni-read-pages');
const { webpack } = new TransformPages();
const path = require('path');
module.exports = {
	devServer: {
		disableHostCheck: true, // 禁用 Host 头检查
		// 其他 devServer 配置
	},
	chainWebpack: (config) => {
		config.resolveLoader.alias.set('file-loader', __dirname + '/node_modules/file-loader');
		config.module.rule('markdown').test(/\.md$/).use('file-loader').loader('file-loader').end();
		config.module
			.rule('vue')
			.test(/\.vue$/)
			.use()
			.loader(path.resolve(__dirname, './node_modules/ste-vue-inset-loader'))
			.end();
	},
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath'],
					});
					return JSON.stringify(tfPages.routes);
				}, true),
			}),
		],
	},
};
