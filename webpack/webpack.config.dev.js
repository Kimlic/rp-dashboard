const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

require('dotenv').config({path: path.join(__dirname, '../config/development.env')})
const config = require('./webpack.config.js')

const host = process.env.HOST
const port = process.env.PORT

module.exports = merge.smart(config, {
  devtool: 'source-map',
  mode: 'development',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js'
  },
  devServer: {
    host: host,
    port: port,
    contentBase: path.join(__dirname, '../public'),
    historyApiFallback: true,
    https: false,
    noInfo: true,
    hot: false,
    proxy: {
      "/api/*": "http://localhost:4003"
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HOST: JSON.stringify(process.env.HOST),
        PORT: JSON.stringify(process.env.PORT),
        API_URI: JSON.stringify(process.env.API_URI),
        PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL)
      }
    })
  ]
})
