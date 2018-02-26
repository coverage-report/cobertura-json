"use strict";

var fs = require("fs");
var parseString = require("xml2js").parseString;

var parse = {};

var classesFromPackages = function (packages) {
    var classes = [];

    packages.forEach(function (packages) {
        packages.package.forEach(function (pack) {
            pack.classes.forEach(function(c) {
                classes = classes.concat(c.class);
            });
        });
    });

    return classes;
};

var unpackage = function (packages) {
    var classes = classesFromPackages(packages);

    return classes.map(function (c) {
        var classCov = {
            title: c.$.name,
            file: c.$.filename,
            functions: {
                found: c.methods && c.methods[ 0 ].method ? c.methods[ 0 ].method.length : 0,
                hit: 0,
                details: !c.methods || !c.methods[ 0 ].method ? [] : c.methods[ 0 ].method.map(function (m) {
                    return {
                        name: m.$.name,
                        line: Number(m.lines[ 0 ].line[ 0 ].$.number),
                        hit: Number(m.lines[ 0 ].line[ 0 ].$.hits)
                    };
                })
            },
            lines: {
                found: c.lines && c.lines[ 0 ].line ? c.lines[ 0 ].line.length : 0,
                hit: 0,
                details: !c.lines || !c.lines[ 0 ].line ? [] : c.lines[ 0 ].line.map(function (l) {
                    return {
                        line: Number(l.$.number),
                        hit: Number(l.$.hits)
                    };
                })
            }
        };

        classCov.functions.hit = classCov.functions.details.reduce(function (acc, val) {
            return acc + (val.hit > 0 ? 1 : 0);
        }, 0);

        classCov.lines.hit = classCov.lines.details.reduce(function (acc, val) {
            return acc + (val.hit > 0 ? 1 : 0);
        }, 0);

        return classCov;
    });
};

parse.parseContent = function (xml) {
    return new Promise(function (resolve, reject) {
        parseString(xml, function (err, parseResult) {
            if (err) {
                reject(err);
            }

            var result = unpackage(parseResult.coverage.packages);

            resolve(result);
        });
    });
};

parse.parseFile = function(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, "utf8", function (err, content) {
            if (err) {
                reject(err);
            }

            parse.parseContent(content).then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        });
    });
};

module.exports = parse;
