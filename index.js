'use strict';

var path = require('path');
var dd = require('doxdox');
var through = require('through2');
var gutil = require('gulp-util');
var File = gutil.File;
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-doxdox';

function getExtension(filename) {
  var ext = path.extname(filename || '').split('.');
  return ext[ext.length - 1] || '';
}

var consolidate = function(scripts) {
  return through.obj(function(file, enc, callback) {
    /*jshint validthis:true*/
    // Do nothing if no contents or not a JS file
    if (file.isNull() || getExtension(file.path).toLowerCase() !== 'js') {
      this.push(file);
      return callback();
    }

    if (!scripts.firstFile) {
      scripts.firstFile = file;
    }

    if (file.isStream()) {

      // http://nodejs.org/api/stream.html
      // http://nodejs.org/api/child_process.html
      // https://github.com/dominictarr/event-stream

      // accepting streams is optional
      this.emit('error',
        new PluginError(PLUGIN_NAME, 'Stream content is not supported'));
      return callback();
    }

    // check if file.contents is a `Buffer`
    if (file.isBuffer()) {
      var script = {
        name: path.basename(file.path),
        contents: file.contents.toString()
      };

      file.doxdoxIgnore = true;
      this.push(file); // will be ignored in the next step. this is really roundabout but whatever #fkitshipit
      scripts.push(script);
    }

    return callback();
  });
};

var shipit = function(scripts) {
  var complete = false; // ensures it's done once
  return through.obj(function(file, enc, callback) {
    if (complete) {
      return callback();
    }

    var content = dd.parseScripts(scripts, '/dev/null', { // hacky, we should make this optional
      layout: 'bootstrap'
    });

    this.push(new File({
      cwd: scripts.firstFile.cwd,
      base: scripts.firstFile.base,
      path: path.join(scripts.firstFile.base, 'index.html'),
      contents: new Buffer(content)
    }));

    complete = true;
    callback();
  });
};

function doxdox(options) {
  var scripts = [];
  return gutil.combine(
    consolidate(scripts),
    shipit(scripts)
  )();
}

doxdox.consolidate = consolidate;

module.exports = doxdox;
