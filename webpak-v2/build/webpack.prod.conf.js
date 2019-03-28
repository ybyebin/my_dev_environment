'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConf = require('./webpack.base.conf');
const prodConfig = require('../config').build;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { assetsPath } = require('./utils');
const { entryList } = require('./setting.js');
const { rulesList, stylePlugins } = require('./style.js');
const prodConf = merge(baseConf, {
  output: {
    publicPath: './',
    filename: assetsPath('/js/[name].[chunkhash:8].js')
  },
  devtool: prodConfig.devtoolType,
  module: {
    rules: [...rulesList()]
  },
  plugins: [
   
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new OptimizeCSSPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),

    // new CopyWebpackPlugin([ // 复制插件
    //     {
    //         from: path.join(__dirname, '../src/common/static'),
    //         to: path.join(__dirname, '../dist/')
    //     }
    // ]),

    ...stylePlugins
  ]
});
module.exports = prodConf;
