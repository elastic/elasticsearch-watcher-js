module.exports = function addWatcherApi(Client, config, components) {
  var ClientAction = components.ClientAction;

  var watcher = Client.prototype.watcher = function WatcherNS(transport) {
    this.transport = transport;
  };

  Client.prototype._namespaces.push('watcher');

  /**
   * Perform a [watcher.ackWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-ack-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Duration} params.masterTimeout
   * @param {String} params.id
   */
  watcher.ackWatch = new ClientAction({
    params: {
      masterTimeout: {
        type: 'duration',
        name: 'master_timeout'
      },
      id: {
        type: 'string',
        required: true
      }
    },
    url: {
      opt: 0
    },
    method: 'POST'
  });

  /**
   * Perform a [watcher.deleteWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-delete-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Duration} params.masterTimeout
   * @param {Boolean} params.force
   * @param {String} params.id
   */
  watcher.deleteWatch = new ClientAction({
    params: {
      masterTimeout: {
        type: 'duration',
        name: 'master_timeout'
      },
      force: {
        type: 'boolean'
      },
      id: {
        type: 'string',
        required: true
      }
    },
    url: {
      opt: 0
    },
    method: 'DELETE'
  });

  /**
   * Perform a [watcher.executeWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-execute-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} params.id
   */
  watcher.executeWatch = new ClientAction({
    params: {
      id: {
        type: 'string',
        required: true
      }
    },
    url: {
      opt: 0
    },
    method: 'POST'
  });

  /**
   * Perform a [watcher.getWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-get-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} params.id
   */
  watcher.getWatch = new ClientAction({
    params: {
      id: {
        type: 'string',
        required: true
      }
    },
    url: {
      opt: 0
    }
  });

  /**
   * Perform a [watcher.info](http://www.elastic.co/guide/en/watcher/current/appendix-api-info.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.info = new ClientAction({
    params: {},
    url: {
      opt: 0,
      req: 0
    }
  });

  /**
   * Perform a [watcher.putWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-put-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Duration} params.masterTimeout
   * @param {String} params.id
   */
  watcher.putWatch = new ClientAction({
    params: {
      masterTimeout: {
        type: 'duration',
        name: 'master_timeout'
      },
      id: {
        type: 'string',
        required: true
      }
    },
    url: {
      opt: 0
    },
    needBody: true,
    method: 'PUT'
  });

  /**
   * Perform a [watcher.restart](http://www.elastic.co/guide/en/watcher/current/appendix-api-service.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.restart = new ClientAction({
    params: {},
    url: {
      opt: 0,
      req: 0
    },
    method: 'PUT'
  });

  /**
   * Perform a [watcher.start](http://www.elastic.co/guide/en/watcher/current/appendix-api-service.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.start = new ClientAction({
    params: {},
    url: {
      opt: 0,
      req: 0
    },
    method: 'PUT'
  });

  /**
   * Perform a [watcher.stats](http://www.elastic.co/guide/en/watcher/current/appendix-api-stats.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.stats = new ClientAction({
    params: {},
    url: {
      opt: 0,
      req: 0
    }
  });

  /**
   * Perform a [watcher.stop](http://www.elastic.co/guide/en/watcher/current/appendix-api-service.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.stop = new ClientAction({
    params: {},
    url: {
      opt: 0,
      req: 0
    },
    method: 'PUT'
  });


};
