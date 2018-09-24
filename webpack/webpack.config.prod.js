const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin')

const config = require('./webpack.config.js');
process.env.NODE_ENV = 'production'

module.exports = merge.smart(config, {
  mode: 'production',
  output: {
    publicPath: '/',
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
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
