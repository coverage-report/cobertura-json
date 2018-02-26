"use strict";

var assert = require("assert");
var parse = require("../src");
var path = require("path");

describe( "Check if it can parse a cobertura file", function ()
{
    it("should parse a normal file", function (done) {

        var filePath = path.join(__dirname, "assets", "sample.xml");

        parse.parseFile(filePath).then(function (result) {
            assert.equal( result.length, 4 );
            assert.equal( result[ 0 ].functions.found, 16 );
            assert.equal( result[ 0 ].functions.hit, 14 );
            assert.equal( result[ 0 ].lines.found, 45 );
            assert.equal( result[ 0 ].lines.hit, 40 );
            assert.equal( result[ 0 ].functions.details[ 0 ].line, 5 );
            assert.equal( result[ 0 ].functions.details[ 0 ].hit, 6 );
            assert.equal( result[ 0 ].lines.details[ 0 ].line, 2 );
            assert.equal( result[ 0 ].lines.details[ 0 ].hit, 178 );
            done();
        }).catch(function (err) {
            assert.equal(err, null);
            done();
        });

    } );

    it( "should parse a sparse file", function (done) {

        var filePath = path.join( __dirname, "assets", "sample2.xml" );

        parse.parseFile(filePath).then(function (result) {
            assert.equal( result.length, 2 );
            assert.equal( result[ 0 ].functions.found, 0 );
            assert.equal( result[ 0 ].functions.hit, 0 );
            assert.equal( result[ 0 ].lines.found, 2 );
            assert.equal( result[ 0 ].lines.hit, 0 );
            assert.equal( result[ 0 ].functions.details.length, 0 );
            assert.equal( result[ 0 ].lines.details.length, 2 );
            done();
        }).catch(function (err) {
            assert.equal(err, null);
            done();
        });

    } );
} );
