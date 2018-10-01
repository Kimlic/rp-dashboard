const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin')
const envFile = require('node-env-file')

const config = require('./webpack.config.js')

try {
  envFile(path.join(__dirname, '../config/production.env'))
} catch (e) {
  console.log(e);
}

console.log("NODE ENV:", process.env.NODE_ENV);
console.log("STARTING ON:", process.env.HOST, process.env.PORT);
console.log("API_URI:", process.env.API_URI);
console.log("PUBLIC_URL:", process.env.PUBLIC_URL);

module.exports = merge.smart(config, {
  mode: 'production',
  output: {
    // publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      warningsFilter: (src) => true
    }),
    new HtmlWebpackPlugin({ title: 'Kimlic Dashboard' }),
    new HtmlWebpackRootPlugin({ tagName: 'main', tagId: 'root' }),
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
});
