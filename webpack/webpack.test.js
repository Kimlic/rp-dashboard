const $path = require( 'path' );
const $webpack = require( 'webpack' );


const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );


const $$root = $path.join(__dirname, '..');
const $$exclude = /(?:node_modules|bower_components)/;


module.exports = {
	bail: true, // https://webpack.js.org/configuration/other-options/#bail
	cache: true, // https://webpack.js.org/configuration/other-options/#cache
	context: $$root,
	devtool: 'inline-source-map', // https://webpack.js.org/configuration/devtool/#devtool
	profile: true, // https://webpack.js.org/configuration/other-options/#profile
	// progress: true, // https://webpack.js.org/configuration/dev-server/#devserver-progress-cli-only
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
		polyfill: "@babel/polyfill",
		index: $path.join($$root, 'src', 'index.js'),
		test: $path.join($$root, 'src', 'test.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: $path.join($$root, 'dist'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(?:mjs|js|jsx)$/,
				exclude: $$exclude,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							// '@babel/preset-flow',
							'@babel/preset-react',
							// '@babel/preset-typescript',
						],
						plugins: [
							'@babel/plugin-transform-runtime',
							'@babel/plugin-proposal-object-rest-spread',
						],
					},
				},
			},
			// {
			// 	test: /\.(?:css|scss|sass)$/i,
			// 	exclude: $$exclude,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader',
			// 		'sass-loader'
			// 	]
			// },
			{
				test: /[\.](?:css|sass|scss)/i,
				exclude: $$exclude,
				use: ExtractTextPlugin.extract(
					{
						use: [
							// {
							// 	loader: 'postcss-loader',
							// 	options: {
							// 		plugins: () => [
							// 			require('autoprefixer')(
							// 				{
							// 					browsers: [
							// 						'> 1%',
							// 						'last 2 versions'
							// 					],
							// 				}
							// 			)
							// 		],
							// 	},
							// },
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									minimize: true,
									url: false,
								},
							},
							{
								loader: "sass-loader",
								options: {
									sourceMap: true,
								},
							},
						],
					}
				),
			},
			{
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
				}
			},
		]
	},
	plugins: [
		new CaseSensitivePathsPlugin( ),
		// new $webpack.debug.ProfilingPlugin(
		// 	{
		// 		outputPath: 'dist/events.json',
		// 	}
		// ),
		new ExtractTextPlugin(
			{
				filename: 'style.bundle.css',
				allChunks: true,
			}
		),
	],
	resolve: {
		extensions: [".webpack.js", ".web.js", ".mjs", ".js", '.jsx', ".json"],
		alias: {
			src: $path.resolve($$root, 'src'),
		},
	},
};
