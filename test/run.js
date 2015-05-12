/* global describe, before */
module.exports = function () {
  var join = require('path').join;
  var glob = require('glob');
  var jsYaml = require('js-yaml');
  var readFile = require('fs').readFileSync;
  var relative = require('path').relative;

  var YamlFile = require('./YamlFile');
  var client = require('./client');

  var port = parseFloat(process.env.ES_PORT || 9200);
  var testDir = join(__dirname, '..', 'elasticsearch-watcher', 'rest-api-spec', 'test');

  describe('', function () {
    this.timeout(30000);

    // before running any tests...
    before(function () {
      this.timeout(5 * 60 * 1000);
      return client.create(port)
      .then(function () {
        // make sure ES is empty
        return client.get().clearEs();
      });
    });

    var files = glob.sync(join(testDir, '**', '*.yaml'));
    files.map(function (filename) {
      var docs = jsYaml.safeLoadAll(readFile(filename));
      var relName = relative(testDir, filename);
      return new YamlFile(relName, docs);
    });
  });
};
