/*global describe, it*/
'use strict';

var fs = require('fs');
var es = require('event-stream');
var should = require('should');

require('mocha');

delete require.cache[require.resolve('../')];

var gutil = require('gulp-util');
var doxdox = require('../');

describe('gulp-doxdox', function() {

  var expectedFile = new gutil.File({
    path: 'test/expected/lodash.html',
    cwd: 'test/',
    base: 'test/expected',
    contents: fs.readFileSync('test/expected/lodash.html')
  });

  it('should produce expected file via buffer', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/lodash.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/lodash.js')
    });

    var stream = doxdox();

    stream.on('error', function(err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it('should error on stream', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/lodash.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.createReadStream('test/fixtures/lodash.js')
    });

    var stream = doxdox();

    stream.on('error', function(err) {
      should.exist(err);
      done();
    });

    stream.on('data', function(newFile) {
      newFile.contents.pipe(es.wait(function(err, data) {
        done(err);
      }));
    });

    stream.write(srcFile);
    stream.end();
  });
});
