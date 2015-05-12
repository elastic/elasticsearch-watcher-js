/* global describe, before */
module.exports = function () {
  var glob = require('glob');
  var jsYaml = require('js-yaml');
  var YamlFile = require('./YamlFile');
  var client = require('./client');
  var port = parseFloat(process.env.ES_PORT || 9200);

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



  });
};
