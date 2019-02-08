import $path from 'path';
import $webpack from 'webpack';


import $postcssAdvancedVariables from 'postcss-advanced-variables'; // https://github.com/jonathantneal/postcss-advanced-variables
import $postcssImport from 'postcss-import';
import $postcssImportUrl from 'postcss-import-url';
import $postcssPresetEnv from 'postcss-preset-env';
import $precss from 'precss'; // https://github.com/jonathantneal/precss
import $autoprefixer from 'autoprefixer'; // https://github.com/postcss/autoprefixer
import $cssnano from 'cssnano'; // https://github.com/cssnano/cssnano


import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import Visualizer from'webpack-visualizer-plugin'; // https://github.com/chrisbateman/webpack-visualizer#plugin-usage


const $$production = false;
const $$development = !$$production;
const $$root = $path.join( __dirname, '' );
const $$path = ( ...path ) => $path.join.apply( $path, [$$root, ...path] );
const $$exclude = /(?:node_modules|bower_components)/i;
const $$browsers = 'last 2 versions, > 5%, not dead, safari tp, ie >= 8';


// https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081
// https://github.com/faceyspacey/extract-css-chunks-webpack-plugin
// https://webpack.js.org/configuration/dev-server/#devserver-progress-cli-only
module.exports = {
	mode: $$production ? 'production' : 'development',

	context: $$root,
	entry: {
		// polyfill: "@babel/polyfill",
		index: $$path( 'src', 'index.js' ),
		test: $$path( 'src', 'test.js' ),
	},

	output: {
		chunkFilename: '[name].[id].bundle.js',
		crossOriginLoading: 'anonymous',
		jsonpScriptType: 'text/javascript',
		filename: '[name].bundle.js',
		hotUpdateChunkFilename: '[name].[id].hot-update.bundle.js',
		hotUpdateMainFilename: '[hash].hot-update.bundle.js',
		path: $$path( 'dist' ),
		pathinfo: $$development,
		publicPath: '/',
		sourceMapFilename: '[file].map',
		strictModuleExceptionHandling: true,
	},
	
	devServer: {
		contentBase: $$path( 'dist' ),
		compress: true,
		hot: true,
		// index: 'index.html',
		lazy: true,
		open: true,
		openPage: '',
		overlay: true,
		port: 8080,
		// progress: true,
		// public: 'localhost',
		publicPath: '/dist/',
		watchContentBase: true,
		// writeToDisk: true,
	},

	bail: true, // https://webpack.js.org/configuration/other-options/#bail
	cache: true, // https://webpack.js.org/configuration/other-options/#cache
	devtool: 'inline-source-map', // https://webpack.js.org/configuration/devtool/#devtool
	parallelism: 100,
	performance: {
		hints: 'warning',
	},
	profile: true, // https://webpack.js.org/configuration/other-options/#profile
	watch: true, // https://webpack.js.org/configuration/watch/#watch
	watchOptions: {
		aggregateTimeout: 300,
		ignored: $$exclude,
		poll: true,
	},
	// 'info-verbosity': 'verbose',
	name: 'dashboard',

	resolve: {
		extensions: [ ".webpack.js", ".web.js", ".mjs", ".js", '.jsx', ".json" ],
		alias: {
			root: $$root,
			src: $$path( 'src' ),
		},
	},

	optimization: {
		// minimizer: [
		// 	new UglifyJsPlugin( {
		// 		cache: true,
		// 		parallel: true,
		// 		sourceMap: true, // set to true if you want JS source maps
		// 	} ),
		// 	new OptimizeCSSAssetsPlugin( { } ),
		// ],
		// splitChunks: {
		// 	chunks: 'all',
		// },
	},

	module: {
		rules: [
			{
				/* babel */
				test: /\.(?:mjs|js|jsx)$/,
				exclude: $$exclude,
				loader: 'babel-loader',
				options: {
					plugins: [
						'@babel/plugin-transform-runtime',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-export-default-from',
						'@babel/plugin-transform-react-display-name',
						'@babel/plugin-proposal-object-rest-spread',
					],
					presets: [
						'@babel/preset-flow',
						// '@babel/preset-typescript',
						[ '@babel/preset-react', { 'development': $$development, }, ],
						[
							'@babel/preset-env',
							{
								debug: $$development,
								targets: {
									browsers: $$browsers,
								},
							},
						],
						// [ 'minify', { undefinedToVoid: false, }, ],
					],
					// useBuiltIns: true,
				},
				/* end: babel */
			},
			{
				/* css */
				test: /[\.](?:sa|sc|c)ss/i,
				exclude: $$exclude,
				use: [
					MiniCssExtractPlugin.loader,
					// $$production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							ident: 'css-loader',
							minimize: true,
							// modules: true,
							sourceMap: true,
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [ 
								// $postcss_import( { root: loader.resourcePath } ),
								// $postcss_import_url( ),
								// $precss( ),
								// $postcss_advanced_variables( ),
								// $postcss_preset_env( ),
								$autoprefixer( { browsers: $$browsers, } ),
								$cssnano( ),
							],
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
				/* end: css */
			},
			{
				/* html */
				test: /\.html$/i,
				exclude: $$exclude,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
				/* end: html */
			},
			{
				/* graphQL */
				// https://www.apollographql.com/docs/react/recipes/webpack.html
				test: /\.(graphql|gql)$/i,
				exclude: $$exclude,
				loader: 'graphql-tag/loader',
				/* end: graphQL */
			},
			{
				/* image */
				test: /\.(?:jpe?g|png|gif|svg)$/i,
				exclude: $$exclude,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/images/',
					name: '[name].[ext]?[hash:10]',
				},
				/* end: image */
			},
			{
				/* font */
				test: /\.(?:woff|woff2|eot|ttf|otf)$/i,
				exclude: $$exclude,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/fonts/',
					name: '[name].[ext]?[hash:10]'
				},
				/* end: font */
			},
		],
	},

	plugins: [
		new CaseSensitivePathsPlugin( ),
		new CleanWebpackPlugin( [ 'dist/*' ] ),
		new HtmlWebpackPlugin({
			title: 'Kimlic Dashboard',
			template: $$path( 'src', 'index.template.html' ),
			filename: 'index.html',
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer',
		}),
		new MiniCssExtractPlugin( {
			filename: '[name].bundle.css?[hash:10]',
			chunkFilename: '[name].[id].bundle.css?[hash:10]',
			// disable: $$development,
		} ),
		new Visualizer( {
			filename: 'stat.html',
		} ),
	],

};
