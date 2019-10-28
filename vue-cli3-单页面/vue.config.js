const CompressionPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const product = process.env.NODE_ENV === "production"; //是否是  build
let path = require('path');

let ts = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('')
let outputDir = 'kanghuaPc';
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

module.exports = {

    lintOnSave: false, //禁用eslint
    publicPath: './',
    outputDir: outputDir, // 输出文件目录
    productionSourceMap: false,
    // devServer: {
    //     index: 'page1.html', //默认启动serve 打开page1页面
    //     open: process.platform === 'darwin',
    //     host: '',
    //     port: 8088,
    //     https: false,
    //     hotOnly: false,

    //     before: app => { }
    // },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: product ? true : false,
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: product ? false : true,
        // css预设器配置项
        loaderOptions: {
            less: { // 配置less（其他样式解析用法一致）
                javascriptEnabled: true // 设置为true
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
    },

    configureWebpack: config => {
        config.externals = {
            // 'axios': 'axios',
            // 'vue':'Vue'

        }

        // 打包去掉console
        if (product) {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },

    chainWebpack: config => {
        // // 删除预加载
        // Object.keys(pages).forEach(entryName => {
        //     config.plugins.delete(`prefetch-${entryName}`);
        //     config.plugins.delete(`preload-${entryName}`);
        // });
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 10240
                return options
            });



        if (product) {
            config.plugin("extract-css").tap(() => [{
                path: path.join(__dirname, "./dist"),
                filename: "css/[name].[contenthash:8].css"
            }]);
            // 开启线上压缩
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

            config.plugin('compress')
                .use(FileManagerPlugin, [{
                    onEnd: {
                        delete: [   //首先需要删除项目根目录下的dist.zip
                            './*.zip'
                        ],
                        archive: [   //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                            { source: `./${outputDir}`, destination: `./${outputDir}-${ts}.zip` },

                        ]
                    }
                }])


        }
    },


}
