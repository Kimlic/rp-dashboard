const $autoprefixer = require( 'autoprefixer' ); // https://github.com/postcss/autoprefixer
const $precss = require( 'precss' ); // https://github.com/jonathantneal/precss
const $cssnano = require( 'cssnano' ); // https://github.com/cssnano/cssnano
const $postcss_advanced_variables = require( 'postcss-advanced-variables' ); // https://github.com/jonathantneal/postcss-advanced-variables
const $postcss_import = require( 'postcss-import' );
const $postcss_import_url = require( 'postcss-import-url' );
const $postcss_preset_env = require( 'postcss-preset-env' );
const $path = require( 'path' );
const $webpack = require( 'webpack' );


const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const Visualizer = require( 'webpack-visualizer-plugin' ); // https://github.com/chrisbateman/webpack-visualizer#plugin-usage


const $$production = false;
const $$development = !$$production;
const $$root = $path.join( __dirname, '' );
const $$path = ( ...path ) => $path.join.apply( $path, [$$root, ...path] );
const $$exclude = /(?:node_modules|bower_components)/;
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
	
	bail: true, // https://webpack.js.org/configuration/other-options/#bail
	cache: true, // https://webpack.js.org/configuration/other-options/#cache
	devServer: {
		compress: true,
		hot: true,
	},
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
			src: $path.resolve($$root, 'src'),
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
				test: /\.(?:mjs|js|jsx)$/,
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
								// $cssnano( ),
							],
							sourceMap: true,
						},
					},
					{ loader: 'sass-loader', options: { sourceMap: true, }, },
				],
				/* end: css */
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
		new CleanWebpackPlugin( [ 'dist/*bundle*', 'dist/assets', 'dist/stat.html' ] ),
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
