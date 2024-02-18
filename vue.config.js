const TransformPages = require('uni-read-pages');
const { webpack } = new TransformPages();
// vue.config.js
module.exports = {
    // ...,

    chainWebpack: (config) => {
        config.resolveLoader.alias.set('file-loader', __dirname + '/node_modules/file-loader');
        config.module.rule('markdown').test(/\.md$/).use('file-loader').loader('file-loader').end();
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                ROUTES: webpack.DefinePlugin.runtimeValue(() => {
                    const tfPages = new TransformPages({
                        includes: ['path', 'name', 'aliasPath']
                    });
                    return JSON.stringify(tfPages.routes);
                }, true)
            })
        ]
    }
};
