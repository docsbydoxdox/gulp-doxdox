/*global describe, it*/

'use strict';

const fs = require('fs');
const es = require('event-stream');
const should = require('should');

const File = require('vinyl');

const doxdox = require('../../');

describe('gulp-doxdox', function () {

  const expectedFile = new File({
    path: 'test/fixtures/lodash.html',
    contents: fs.readFileSync('test/fixtures/lodash.html')
  });

  it('should produce expected file via buffer', function (done) {

    const srcFile = new File({
      path: 'test/fixtures/lodash.js',
      contents: fs.readFileSync('test/fixtures/lodash.js')
    });

    const stream = doxdox();

    stream.on('error', function (err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function (newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      should.ok(newFile.contents.equals(expectedFile.contents));

      done();

    });

    stream.write(srcFile);

    stream.end();

  });

  it('should error on stream', function (done) {

    const srcFile = new File({
      path: 'test/fixtures/lodash.js',
      contents: fs.createReadStream('test/fixtures/lodash.js')
    });

    const stream = doxdox();

    stream.on('error', function (err) {
      should.exist(err);
      done();
    });

    stream.on('data', function (newFile) {
      newFile.contents.pipe(es.wait(function (err, data) {
        done(err);
      }));
    });

    stream.write(srcFile);

    stream.end();

  });

});
