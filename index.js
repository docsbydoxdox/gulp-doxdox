"use strict";

const through = require("through2");
const PluginError = require("plugin-error");
const File = require("vinyl");

const doxdox = require("doxdox");

const PLUGIN_NAME = "gulp-doxdox";

module.exports = function (config) {

  config = config || {};

  const files = [];

  return through.obj(function (file, encoding, callback) {

    if (file.isNull()) {

      return callback(null, file);

    } else if (file.isStream()) {

      this.emit("error", new PluginError(PLUGIN_NAME, "Streams not supported!"));

    } else if (file.isBuffer()) {

      files.push(file.path);

      callback();

    }

  }, function (callback) {

    doxdox.parseInputs(files, {
      "description": config.description || "",
      "ignore": (config.ignore || "").split(/\s*,\s*/),
      "layout": (config.layout || "markdown").toLowerCase(),
      "parser": (config.parser || "dox").toLowerCase(),
      "title": config.title || "Untitled Project"
    }).then(function (content) {

      this.push(new File({
        path: "docs.md",
        contents: new Buffer(content)
      }));

      callback();

    }.bind(this));

  });

};
