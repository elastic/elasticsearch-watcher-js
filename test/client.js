var BROWSER = process.env.browser;
var VERBOSE = process.env.VERBOSE;
var JENKINS = !!process.env.JENKINS_HOME;

if (BROWSER) {
  /* jshint browser: true */
  var es = window.elasticsearch;
} else {
  var es = require('../../../src/elasticsearch');
}

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var fromRoot = _.bindKey(path, 'join', require('find-root')(__dirname));

// current client
var client = null;

module.exports = {
  create: function create(port) {
    doCreateClient({ logConfig: null });
    var attemptsRemaining = 60;
    var timeout = 500;

    return (function ping() {
      return client.info({
        maxRetries: 0,
        requestTimeout: 100
      })
      .then(
        function (resp) {
          if (resp.name !== 'elasticsearch_js_test_runner') {
            throw new Error('Almosted wiped out another es node. Shut-down all instances of ES and try again.');
          }

          // create a new client
          doCreateClient();
          return client;
        },
        function (err) {
          if (err && --attemptsRemaining) {
            return Promise.delay(ping, timeout);
          }

          throw new Error('unable to establish contact with ES at ' + JSON.stringify({
            host: 'localhost',
            port: port,
            err: err
          }));
        }
      );
    }());

    function doCreateClient(options) {
      options = options || {};

      var logConfig = {};
      if (_.has(options, 'logConfig')) {
        logConfig = options.logConfig;
      } else {
        if (BROWSER) {
          logConfig.type = 'console';
        } else if (JENKINS || !VERBOSE) {
          logConfig.type = 'stdio';
        } else {
          logConfig.type = 'tracer';
        }

        logConfig.level = JENKINS || VERBOSE ? 'trace' : 'error';
      }

      if (logConfig && logConfig.type === 'tracer') {
        try {
          fs.unlinkSync(fromRoot('elasticsearch-tracer.log'));
        } catch (e) {}
      }

      // close existing client
      if (client) client.close();

      client = new es.Client({
        hosts: [
          {
            host: 'localhost',
            port: port
          }
        ],
        log: logConfig
      });

      client.clearEs = function () {
        return Promise.all([
          client.indices.delete({ index: '*', ignore: 404 }),
          client.indices.deleteTemplate({ name: '*', ignore: 404 })
        ]);
      };
    }
  },

  get: function () {
    return client;
  }
};
