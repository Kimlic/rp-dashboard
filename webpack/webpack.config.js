const $path = require( 'path' );
const $webpack = require( 'webpack' );
const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );


const $$root = $path.join(__dirname, '..');
const $$include = $path.join($$root, 'src');
const $$exclude = /(node_modules|bower_components)/;


module.exports = {
  context: $$root,
  entry: [
    "@babel/polyfill",
    $path.resolve(__dirname, '../src', 'index.js'),
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", ".mjs", ".js", '.jsx', ".json"],
    alias: {
      src: $path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: $$include,
        exclude: $$exclude,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images/',
          name: '[name].[ext]?[hash:10]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: $$include,
        exclude: $$exclude,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts/',
          name: '[name].[ext]?[hash:10]'
        }
      },
      {
        test: /\.(css|scss|sass)$/i,
        include: [
          $$include,
          $path.join(__dirname, '..', 'node_modules')
        ],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          $$include,
          $path.join(__dirname, '..', 'node_modules')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new $webpack.debug.ProfilingPlugin({
      outputPath: 'dist/events.json'
    }),
  ],
};
