const $autoprefixer = require( 'autoprefixer' );
const $path = require( 'path' );
const $webpack = require( 'webpack' );


const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );


const $$production = false;
const $$development = $$production;
const $$root = $path.join( __dirname, '' );
const $$path = ( ...path ) => $path.join.apply( $path, [$$root, ...path] );
const $$exclude = /(?:node_modules|bower_components)/;
const $$browsers = 'last 2 versions, > 5%, not dead, safari tp, ie >= 8';


// https://webpack.js.org/configuration/dev-server/#devserver-progress-cli-only
module.exports = {
	bail: true, // https://webpack.js.org/configuration/other-options/#bail
	cache: true, // https://webpack.js.org/configuration/other-options/#cache
	context: $$root,
	devtool: 'inline-source-map', // https://webpack.js.org/configuration/devtool/#devtool
	profile: true, // https://webpack.js.org/configuration/other-options/#profile
	watch: true, // https://webpack.js.org/configuration/watch/#watch
	watchOptions: {
		aggregateTimeout: 300,
		ignored: $$exclude,
		poll: true,
	},
	// 'info-verbosity': 'verbose',
	mode: 'development',
	name: 'development',

	entry: {
		// polyfill: "@babel/polyfill",
		index: $$path( 'src', 'index.js' ),
		test: $$path( 'src', 'test.js' ),
	},

	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].c.bundle.js',
		path: $$path( 'dist' ),
		publicPath: '/',
	},

	resolve: {
		extensions: [ ".webpack.js", ".web.js", ".mjs", ".js", '.jsx', ".json" ],
		alias: {
			src: $path.resolve($$root, 'src'),
		},
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	// 	splitChunks: {
	// 		chunks: 'all',
	// 	},
	},

	module: {
		rules: [
			/* babel */
			{
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
				},
				test: /\.(?:mjs|js|jsx)$/,
			}, /* end: babel */

			// {
			// 	exclude: $$exclude,
			// 	use: [
			// 		{
			// 			loader: 'style-loader',
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 			options: {						
			// 				import: (parsedImport, resourcePath) => {
			// 					console.error(parsedImport, resourcePath);
			// 					return true;
			// 				},
			// 			},
			// 		},
			// 	],
			// 	test: /[\.](?:css)/i,
			// },
			// {
			// 	test: /\.(?:css|scss|sass)$/i,
			// 	exclude: $$exclude,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader',
			// 		'sass-loader'
			// 	]
			// },

			/* scss */
			{
				test: /[\.](?:sa|sc|c)ss/i,
				exclude: $$exclude,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: true,
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								$autoprefixer( {
									browsers: $$browsers,
								} ),
							],
							sourceMap: true,
						},
					},
					{ loader: 'sass-loader', options: { sourceMap: true, }, },
				],
				// use: ExtractTextPlugin.extract( {
				// 		use: [
				// 			{
				// 				loader: 'postcss-loader',
				// 				options: {
				// 					plugins: [
				// 						$autoprefixer( {
				// 							browsers: $$browsers,
				// 						} ),
				// 					],
				// 					sourceMap: true,
				// 				},
				// 			},
				// 			{
				// 				loader: 'css-loader',
				// 				options: {
				// 					sourceMap: true,
				// 					minimize: true,
				// 					url: false,
				// 				},
				// 			},
				// 			{ loader: 'sass-loader', options: { sourceMap: true, }, },
				// 		],
				// } ),
			}, /* end: scss */
			{
				// https://www.apollographql.com/docs/react/recipes/webpack.html
				test: /\.(graphql|gql)$/i,
				exclude: $$exclude,
				loader: 'graphql-tag/loader',
			},
			{
				test: /\.(?:jpe?g|png|gif|svg)$/i,
				exclude: $$exclude,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/images/',
					name: '[name].[ext]?[hash:10]',
				}
			},
			{
				test: /\.(?:woff|woff2|eot|ttf|otf)$/i,
				exclude: $$exclude,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/fonts/',
					name: '[name].[ext]?[hash:10]'
				},
			},
		],
	},

	plugins: [
		new CaseSensitivePathsPlugin( ),
		// new $webpack.debug.ProfilingPlugin(
		// 	{
		// 		outputPath: 'dist/events.json',
		// 	}
		// ),
		new MiniCssExtractPlugin( {
			filename: '[name].bundle.css?[hash:10]',
			chunkFilename: '[name].[id].bundle.css?[hash:10]',
			debug: false,
		} ),
		// new ExtractTextPlugin( {
		// 	filename: '[name].bundle.css?[hash:10]',
		// 	allChunks: true,
		// 	disable: false,
		// } ),
	],

};
