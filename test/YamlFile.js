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
    file.docs = _.map(docs, function (doc) {
      doc =  new YamlDoc(doc, file);
      if (doc.description === 'setup') {
        beforeEach(function () {
          return Promise.resolve(_.pluck(doc._actions, 'testable')).each(function (action) {
            return Promise.try(action);
          });
        });
      } else {
        it(doc.description, function () {
          return Promise.resolve(_.pluck(doc._actions, 'testable')).each(function (action) {
            return Promise.try(action);
          });
        });
      }
    });

    afterEach(/* doc */function () {
      return client.get().clearEs();
    });
  });

}
