module.exports = function addWatcherApi(Client, config, components) {
  var ca = components.clientAction.factory;

  Client.prototype.watcher = components.clientAction.namespaceFactory();
  var watcher = Client.prototype.watcher.prototype;

  /**
   * Perform a [watcher.ackWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-ack-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Duration} params.masterTimeout
   * @param {String} params.id
   */
  watcher.ackWatch = ca({
    params: {
      masterTimeout: {
        type: 'duration',
        name: 'master_timeout'
      }
    },
    url: {
      fmt: '/_watcher/watch/<%=id%>/_ack',
      req: {
        id: {
          type: 'string'
        }
      }
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
  watcher.deleteWatch = ca({
    params: {
      masterTimeout: {
        type: 'duration',
        name: 'master_timeout'
      },
      force: {
        type: 'boolean'
      }
    },
    url: {
      fmt: '/_watcher/watch/<%=id%>',
      req: {
        id: {
          type: 'string'
        }
      }
    },
    method: 'DELETE'
  });

  /**
   * Perform a [watcher.executeWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-execute-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} params.id
   */
  watcher.executeWatch = ca({
    params: {},
    url: {
      fmt: '/_watcher/watch/<%=id%>/_execute',
      req: {
        id: {
          type: 'string'
        }
      }
    },
    method: 'POST'
  });

  /**
   * Perform a [watcher.getWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-get-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} params.id
   */
  watcher.getWatch = ca({
    params: {},
    url: {
      fmt: '/_watcher/watch/<%=id%>',
      req: {
        id: {
          type: 'string'
        }
      }
    }
  });

  /**
   * Perform a [watcher.info](http://www.elastic.co/guide/en/watcher/current/appendix-api-info.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.info = ca({
    params: {},
    url: {
      fmt: '/_watcher/'
    }
  });

  /**
   * Perform a [watcher.putWatch](http://www.elastic.co/guide/en/watcher/current/appendix-api-put-watch.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Duration} params.masterTimeout
   * @param {String} params.id
   */
  watcher.putWatch = ca({
    params: {
      masterTimeout: {
        type: 'duration',
        name: 'master_timeout'
      }
    },
    url: {
      fmt: '/_watcher/watch/<%=id%>',
      req: {
        id: {
          type: 'string'
        }
      }
    },
    needBody: true,
    method: 'PUT'
  });

  /**
   * Perform a [watcher.restart](http://www.elastic.co/guide/en/watcher/current/appendix-api-service.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.restart = ca({
    params: {},
    url: {
      fmt: '/_watcher/_restart'
    },
    method: 'PUT'
  });

  /**
   * Perform a [watcher.start](http://www.elastic.co/guide/en/watcher/current/appendix-api-service.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.start = ca({
    params: {},
    url: {
      fmt: '/_watcher/_start'
    },
    method: 'PUT'
  });

  /**
   * Perform a [watcher.stats](http://www.elastic.co/guide/en/watcher/current/appendix-api-stats.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.stats = ca({
    params: {},
    url: {
      fmt: '/_watcher/stats'
    }
  });

  /**
   * Perform a [watcher.stop](http://www.elastic.co/guide/en/watcher/current/appendix-api-service.html) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  watcher.stop = ca({
    params: {},
    url: {
      fmt: '/_watcher/_stop'
    },
    method: 'PUT'
  });


};
