# gulp-doxdox

> [doxdox][doxdox] plugin for [gulp](https://github.com/wearefractal/gulp)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

## Usage

First, install `gulp-doxdox` as a development dependency:

```shell
npm install --save-dev gulp-doxdox
```

Then, add it to your `gulpfile.js`:

```javascript
var doxdox = require("gulp-doxdox");

gulp.src("./src/**/*.js")
  .pipe(doxdox({
    "title": "Untitled Project",
    "layout": "markdown"
  }))
  .pipe(rename("documentation.md"))
  .pipe(gulp.dest("./dist"));
```

## API

### doxdox(options)

#### options.layout
Type: `String`  
Default: `"markdown"`

Layout to render the documentation with.

- `"Markdown"``
- `"Bootstrap"``
- Custom Handlebars template file (`"template.hbs"`)

#### options.description
Type: `String`  
Default: `""`

#### options.title
Type: `String`  
Default: `"Untitled Project"`

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
