const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const devConfig = require('./build/webpack.dev')
const prodConfig = require('./build/webpack.prod')

const smp = new SpeedMeasurePlugin()

module.exports = process.env.NODE_ENV === 'development' ? devConfig : smp.wrap(prodConfig)
