const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('config');
const path = require('path');

const resolve = dir => {
  return path.join(__dirname, '..', dir);
};

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: config.port,
    contentBase: resolve('client'), //本地服务器所加载的页面所在的目录
    //publicPath: 'http://0.0.0.0:' + config.port + '/client/',
    historyApiFallback: true, //不跳转
    inline: true,
    hot: true,
    proxy: config.proxy,
    clientLogLevel: 'warning',
    disableHostCheck: true,
  },
  mode: 'development',
});
