# cobertura-json

Parse [cobertura](http://cobertura.github.io/cobertura/) report files, and return a JSON representation in a [lcov-parse](https://github.com/davglass/lcov-parse) compatible manner.

## Installation

```
npm install @cvrg-report/cobertura-json --save
```

## Usage

```javascript
var cobertura = require( "@cvrg-report/cobertura-json" );

// Parse by file path
cobertura.parseFile("filepath.xml")
    .then(function (result) {
        console.log(JSON.stringify(result));
    }).catch(function (err) {
        console.error(err);
    });

// Parse by file contents
cobertura.parseContent("<?xml version=\"1.0\" ?><coverage>...</coverage>")
    .then(function (result) {
        console.log(JSON.stringify(result));
    }).catch(function (err) {
        console.error(err);
    });
```

## Thanks

This repo was initially forked from [vokal/cobertura-parse](https://github.com/vokal/cobertura-parse). Thanks a lot!
