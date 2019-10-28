const CompressionPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const product = process.env.NODE_ENV === "production"; //是否是  build
let ts = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('')
let outputDir = 'kanghuaWx';
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

    lintOnSave: false, //禁用eslint
    publicPath: './',
    outputDir: outputDir, // 输出文件目录
    productionSourceMap: false,
    pages,
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
        // 打包去掉console
        if (product) {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
    },
    chainWebpack: config => {

        Object.keys(pages).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
            config.plugins.delete(`preload-${entryName}`);
        });
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 10240
                return options
            })
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
                            './*.zip',
                        ],
                        archive: [   //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                            { source: `./${outputDir}`, destination: `./${outputDir}-${ts}.zip` },

                        ]
                    }
                }])


            config.optimization.splitChunks({
                chunks: 'all',// async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
                cacheGroups: {
                    vendors: {
                        test: /[\/]node_modules[\/]/,// 指定是node_modules下的第三方包
                        name: 'chunk-vendors',
                        chunks: 'all',
                        minChunks: 3,
                        priority: -10   // 抽取优先级

                    },
                    // 抽离自定义工具库
                    utilCommon: {
                        name: 'chunk-common',
                        minSize: 1024, // 将引用模块分离成新代码文件的最小体积
                        minChunks: 3, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                        priority: -20
                    }
                }
            });

        }
    },




}
