var es = require('elasticsearch');
var Promise = require('bluebird');

// current client
var client = null;

module.exports = {
  create: function create(port) {
    doCreateClient({ logConfig: null });
    var attemptsRemaining = 60;
    var timeout = 500;

    return (function ping() {
      return client.info({
        maxRetries: 0
      })
      .then(
        function (resp) {
          if (resp.name !== 'esjs-watcher-test-runner') {
            throw new Error('Almosted wiped out another es node. Shut-down all instances of ES and try again.');
          }

          // create a new client
          doCreateClient();
          return client;
        },
        function (err) {
          if (err && --attemptsRemaining) {
            return Promise.delay(timeout).then(ping);
          }

          throw new Error('unable to establish contact with ES at ' + JSON.stringify({
            host: 'localhost',
            port: port,
            err: err
          }));
        }
      );
    }());

    function doCreateClient() {
      // close existing client
      if (client) client.close();

      client = new es.Client({
        hosts: [
          {
            host: 'localhost',
            port: 9200
          }
        ],
        plugins: [ require('../src/watcher') ],
        pingTimeout: 5000,
        log: 'trace'
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
