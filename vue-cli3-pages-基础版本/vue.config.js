const CompressionPlugin = require('compression-webpack-plugin')

let path = require('path')
let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {},
        basename, tmp, pathname, appname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        // console.log(entry)
        tmp = entry.split('/').splice(-3);
        console.log(tmp)
        pathname = tmp[1]; // 正确输出js和html的路径

        // console.log(pathname)
        entries[pathname] = {
            entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
            template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
            title: tmp[1],
            filename: tmp[1] + '.html',
            chunks: ['chunk-vendors', 'chunk-common', pathname]
        };
    });
    return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
console.log(pages)
//配置end

module.exports = {

    // transpileDependencies: [],
    // lintOnSave: false, //禁用eslint
    publicPath: './',

    // publicPath: process.env.NODE_ENV === "production" ? './' : '/',
    productionSourceMap: false,
    pages,
    devServer: {
        index: 'page1.html', //默认启动serve 打开page1页面
        open: process.platform === 'darwin',
        host: '',
        port: 8088,
        https: false,
        hotOnly: false,
       
        before: app => { }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 1000
                return options
            })
        Object.keys(pages).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
            config.plugins.delete(`preload-${entryName}`);
        });
        if (process.env.NODE_ENV === "production") {
            config.plugin("extract-css").tap(() => [{
                path: path.join(__dirname, "./dist"),
                filename: "css/[name].[contenthash:8].css"
            }]);
            config
            .plugin('compression')
            .use(CompressionPlugin, {
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
              threshold: 10240,
              minRatio: 0.8,
              cache: true
            })
            .tap(args => { })
   
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: process.env.NODE_ENV === "production" ? true : false,
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
   
    // chainWebpack: config => {
    //      config.entry.app = ['babel-polyfill', './src/main.js'];
    // },

}
