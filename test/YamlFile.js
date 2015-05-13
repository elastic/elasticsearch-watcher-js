/* global describe, it, beforeEach, afterEach */

/**
 * Class representing a YAML file
 * @type {[type]}
 */
module.exports = YamlFile;

var Promise = require('bluebird');
var YamlDoc = require('./YamlDoc');
var client = require('./client');
var _ = require('lodash');

function YamlFile(filename, docs) {
  var file = this;

  // file level skipping flag
  file.skipping = false;

  describe(filename, function () {
    beforeEach(function () {
      return client.get().watcher.start();
    });

    file.docs = _.map(docs, function (doc) {
      doc =  new YamlDoc(doc, file);
      if (doc.description === 'setup') beforeEach(runDoc(doc));
      else it(doc.description, runDoc(doc));
    });

    afterEach(function () {
      return client.get().clearEs();
    });
  });

}

function runDoc(doc) {
  return function docRunner() {
    var steps = _.pluck(doc._actions, 'testable');
    return Promise.resolve(steps).each(function (step) {
      return Promise.try(step);
    });
  };
}
