# gulp-doxdox
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> [doxdox][doxdox] plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-doxdox` as a development dependency:

```shell
npm install --save-dev gulp-doxdox
```

Then, add it to your `gulpfile.js`:

```javascript
var doxdox = require("gulp-doxdox");

gulp.src("./src/*.ext")
	.pipe(doxdox({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### doxdox(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[doxdox]: https://github.com/neogeek/doxdox/

[npm-url]: https://npmjs.org/package/gulp-doxdox
[npm-image]: http://img.shields.io/npm/v/gulp-doxdox.svg?style=flat

[travis-url]: http://travis-ci.org/simplyianm/gulp-doxdox
[travis-image]: https://img.shields.io/travis/simplyianm/gulp-doxdox.svg?style=flat&branch=master

[coveralls-url]: https://coveralls.io/r/simplyianm/gulp-doxdox
[coveralls-image]: https://img.shields.io/coveralls/simplyianm/gulp-doxdox.svg?style=flat

[depstat-url]: https://david-dm.org/simplyianm/gulp-doxdox
[depstat-image]: https://david-dm.org/simplyianm/gulp-doxdox.svg
