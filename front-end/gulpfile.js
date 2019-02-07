const $gulp = require( 'gulp' );
const $sourcemaps = require( 'gulp-sourcemaps' );
const $postcss = require( 'gulp-postcss' ); // https://www.npmjs.com/package/gulp-postcss
const $postcssAdvancedVariables = require( 'postcss-advanced-variables' ); // https://www.npmjs.com/package/postcss-advanced-variables
const $postcssColorShort = require( 'postcss-color-short' ); // https://github.com/andrepolischuk/postcss-color-short
const $postcssDiscardComments = require( 'postcss-discard-comments' ); // https://github.com/ben-eb/postcss-discard-comments
const $postcssFocus =require( 'postcss-focus' ); // https://github.com/postcss/postcss-focus
const $postcssImport = require( 'postcss-import' ); // https://medium.com/@im.simonecorsi/moving-from-sass-to-postcss-why-what-and-how-f68b1bc760dc
const $postcssMixins = require( 'postcss-mixins' );
const $postcssNested = require( 'postcss-nested' );
const $postcssPresetEnv =require( 'postcss-preset-env' ); // https://preset-env.cssdb.org/
const $postcssScss = require( 'postcss-scss' ); // https://github.com/package/postcss-scss
const $postcssSimpleVariables = require( 'postcss-simple-vars' );
const $precss = require( 'precss' ); // https://www.npmjs.com/package/precss
const $autoprefixer = require( 'autoprefixer' );
const $cssMQpacker = require( 'css-mqpacker' ); // https://github.com/hail2u/node-css-mqpacker


const $src = $gulp.src;
const $trg = $gulp.dest;
const $task = $gulp.task;


const $$postcss = [
	$postcssImport( ),
	$postcssPresetEnv( ),
	$postcssMixins( ),
	$postcssNested( ),
	$postcssAdvancedVariables( ),
	$postcssSimpleVariables( ),
	$postcssNested( ),
	$precss( ),
	$postcssColorShort( ),
	$postcssDiscardComments( ),
	$postcssFocus( ),
	$autoprefixer( { browsers: ['last 2 versions'] } ),
	$cssMQpacker( ),
];
const $$scss = ( ) => $src( './src/**/*.scss' )
	.pipe( $sourcemaps.init() )
	.pipe( $postcss( $$postcss, { syntax: $postcssScss } ) )
	.pipe( $sourcemaps.write() )
	.pipe( $trg( './trg/' ) );
$task( 'scss', $$scss );
