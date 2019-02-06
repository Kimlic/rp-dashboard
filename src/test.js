import './test.scss';

const util = require( 'util' );

const xxx = ( x: number ) => ( { a: { b: [ 12, 34, 56, ], }, } );

console.log( util.format( 'test %j', xxx() ) );
console.log( 'xxx' );