'use strict';
const webpack = require('webpack');
const path = require('path');
const baseConf = require('./webpack.base.conf');
const devConfig = require('../config').dev;
const notifier = require('node-notifier');
const merge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const devConf = merge(baseConf, {
  output: {
    publicPath: './',
    filename: '[name].[hash].js'
  },
  devtool: devConfig.devtool,
  //本地服务
  devServer: {
    clientLogLevel: 'warning',
    inline: true,
    // hot: true,
    open: true,
    openPage: devConfig.openPage,
    host: devConfig.host,
    port: devConfig.port,
    publicPath: devConfig.assetsPublicPath,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true,
    // proxy:devConfig.proxyTable  //开启本地代理
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      //编译成功提示！
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${devConfig.host}:${devConfig.port}/${devConfig.openPage}`]
      },
      //编译出错！
      onErrors: function(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        const filename = error.file.split('!').pop();
        //编译出错时,右下角弹出错误提示！
        notifier.notify({
          title: 'mu-cli',
          message: severity + ': ' + error.name,
          subtitle: filename || ''
        });
      }
    })
  ]
});
module.exports = devConf;
