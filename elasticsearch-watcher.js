(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ElasticsearchWatcher = factory();
  }
}(this, function() {
  return function addWatcherApi(Client, config, components) {
    var ca = components.clientAction.factory;

    Client.prototype.watcher = components.clientAction.namespaceFactory();
    var watcher = Client.prototype.watcher.prototype;

    /**
     * Perform a [watcher.ackWatch](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-ack-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {Duration} params.masterTimeout - Specify timeout for watch write operation
     * @param {String} params.id - Watch ID
     */
    watcher.ackWatch = ca({
      params: {
        masterTimeout: {
          name: 'master_timeout',
          type: 'duration'
        }
      },
      url: {
        fmt: '/_xpack/watcher/watch/<%=id%>/_ack',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      },
      method: 'POST'
    });

    /**
     * Perform a [watcher.deleteWatch](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-delete-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {Duration} params.masterTimeout - Specify timeout for watch write operation
     * @param {Boolean} params.force - Specify if this request should be forced and ignore locks
     * @param {String} params.id - Watch ID
     */
    watcher.deleteWatch = ca({
      params: {
        masterTimeout: {
          name: 'master_timeout',
          type: 'duration'
        },
        force: {
          type: 'boolean'
        }
      },
      url: {
        fmt: '/_watcher/watch/<%=id%>',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      },
      method: 'DELETE'
    });

    /**
     * Perform a [watcher.executeWatch](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-execute-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {String} params.id - Watch ID
     */
    watcher.executeWatch = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/watch/<%=id%>/_execute',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      },
      method: 'POST'
    });

    /**
     * Perform a [watcher.getWatch](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-get-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {String} params.id - Watch ID
     */
    watcher.getWatch = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/watch/<%=id%>',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      }
    });

    /**
     * Perform a [watcher.info](http://www.elastic.co/guide/en/watcher/current/appendix-api-info.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     */

    /* DEPRECATED
    watcher.info = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/'
      }
    });
    */

    /**
     * Perform a [watcher.putWatch](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-put-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {Duration} params.masterTimeout - Specify timeout for watch write operation
     * @param {String} params.id - Watch ID
     */
    watcher.putWatch = ca({
      params: {
        masterTimeout: {
          name: 'master_timeout',
          type: 'duration'
        }
      },
      url: {
        fmt: '/_xpack/watcher/watch/<%=id%>',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      },
      needBody: true,
      method: 'PUT'
    });

    /**
     * Perform a [watcher.restart](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-restart.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     */
    watcher.restart = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/_restart'
      },
      method: 'POST'
    });

    /**
     * Perform a [watcher.start](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-start.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     */
    watcher.start = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/_start'
      },
      method: 'POST'
    });

    /**
     * Perform a [watcher.stats](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-stats.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     */
    watcher.stats = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/stats'
      }
    });

    /**
     * Perform a [watcher.stop](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-stop.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     */
    watcher.stop = ca({
      params: {},
      url: {
        fmt: '/_xpack/watcher/_stop'
      },
      method: 'POST'
    });

    /**
     * Perform a [watcher.activateWatcher](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-activate-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {Duration} params.masterTimeout - Specify timeout for watch write operation
     * @param {String} params.id - Watch ID
     */
    watcher.activateWatcher = ca({
      params: {
        masterTimeout: {
          name: 'master_timeout',
          type: 'duration'
        }
      },
      url: {
        fmt: '/_xpack/watcher/watch/<%=id%>/_activate',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      },
      method: 'PUT'
    });



    /**
     * Perform a [watcher.deactivateWatcher](https://www.elastic.co/guide/en/x-pack/5.2/watcher-api-deactivate-watch.html) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     * @param {Duration} params.masterTimeout - Specify timeout for watch write operation
     * @param {String} params.id - Watch ID
     */
    watcher.deactivateWatcher = ca({
      params: {
        masterTimeout: {
          name: 'master_timeout',
          type: 'duration'
        }
      },
      url: {
        fmt: '/_xpack/watcher/watch/<%=id%>/_deactivate',
        req: {
          id: {
            type: 'string',
            required: true
          }
        }
      },
      method: 'PUT'
    });





  };
}));
