const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 提供高速缓存，第二次构建速度大幅加快
//const threadLoader = require('thread-loader');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const env = process.env.NODE_ENV;
// const jsWorkerPool = {
//   // options

//   // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
//   // 当 require('os').cpus() 是 undefined 时，则为 1
//   workers: 3,

//   // 闲置时定时删除 worker 进程
//   // 默认为 500ms
//   // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
//   poolTimeout: 2000
// };

// const cssWorkerPool = {
//   // 一个 worker 进程中并行执行工作的数量
//   // 默认为 20
//   workerParallelJobs: 2,
//   poolTimeout: 2000
// };

//threadLoader.warmup(jsWorkerPool, ['babel-loader']);
//threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader']);

const resolve = dir => {
  return path.join(__dirname, '..', dir);
};

module.exports = {
  entry: [resolve('client/index.js')],
  output: {
    path: resolve('dist'),
    filename: '[name]-[hash].js',
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve('client/'),
        exclude: resolve('client/static/'),
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: jsWorkerPool,
          // },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: [resolve('client'), resolve('node_modules/antd/es')],
        use: [
          // 加入css sourcemap，会将style的样式抽成link，初始refresh时会没有样式
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // {
          //   loader: 'thread-loader',
          //   options: cssWorkerPool
          // },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !!isDev,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)$/,
        include: resolve('client/static'),
        loader: 'url-loader',
        options: {
          limit: 10000, // 10KB
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@common': resolve('client/components/common'),
      '@layout': resolve('client/components/layout'),
      '@utils': resolve('client/utils'),
      '@pages': resolve('client/pages'),
    },
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all', //将模块拆分为单独的包
  //   },
  //   runtimeChunk: 'single', //运行时代码拆分为单独的块
  // },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
    new HtmlWebpackPlugin({
      isDev,
      env,
      template: resolve('client/index.html'),
      favicon: resolve('client/static/images/favicon.ico'),
    }),
    new HardSourceWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
