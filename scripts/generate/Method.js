var _ = require('lodash');
var camelCase = require('camelcase');

var urlParamRE = /\{(\w+)\}/g;

function rekeyWithCamelCase(params) {
  return _.transform(params, function (newParams, param, oldKey) {
    var name = camelCase(oldKey);
    if (name !== oldKey) param.name = oldKey;
    newParams[name] = param;
  });
}

function Method(name, props) {
  this.name = _.map(name.split('.'), camelCase).join('.');
  this.id = 'api-' + name.toLowerCase().replace(/[^\w]+/g, '-');
  this.docUrl = props.documentation;
  this.httpMethods = _.invoke(props.methods, 'toUpperCase');

  var urlParams = rekeyWithCamelCase(props.url.params);
  var urlParts = rekeyWithCamelCase(props.url.parts);

  this.body = props.body || null;

  this.params = _({})
  .assign(urlParams)
  .assign(urlParts)
  .mapValues(function (param) {
    return _.pick(param, 'type', 'default', 'options', 'required', 'name');
  })
  .value();

  if (this.body && this.body.required) {
    this.needBody = true;
  }

  if (this.body && this.body.serialize === 'bulk') {
    this.bulkBody = true;
  }

  var urls = props.url.paths.map(_.partial(parseUrl, props.url.parts));
  var urlSignatures = urls.map(function (url) {
    return _.union(_.keys(url.opt), _.keys(url.req)).sort().join(':');
  });

  if (urlSignatures.length !== _.unique(urlSignatures).length) {
    throw new Error(
      'Multiple URLS with the same signature detected for ' + this.name + '\n' +
      _.pluck(urls, 'fmt').join('\n') + '\n'
    );
  }


  if (urls.length > 1) {
    this.urls = _.map(_.sortBy(urls, 'sortOrder'), function (url) {
      return _.omit(url, 'sortOrder');
    });
  } else {
    this.url = _.omit(urls[0], 'sortOrder');
  }

  this.clientActionSpec = _.pick(this, [
    'params',
    'url',
    'urls',
    'needBody',
    'requestTimeout',
    'bulkBody',
    'paramAsBody'
  ]);

  this.defaultHttpMethod = pickDefaultMethod(this.httpMethods, this.name);

  if (this.defaultHttpMethod !== 'GET') {
    this.clientActionSpec.method = this.defaultHttpMethod;
  }
}


function parseUrl(urlParts, url) {
  var opt = {};
  var req = {};

  if (url.charAt(0) !== '/') {
    url = '/' + url;
  }

  var fmt = url.replace(urlParamRE, function (full, snakeCaseName) {
    var name = camelCase(snakeCaseName);
    var param = urlParts[name] || {};
    var target = (param.required || !param.default) ? req : opt;
    target[name] = _.omit(param, 'required', 'description', 'name');

    return '<%=' + name + '%>';
  });

  return _.omit({
    fmt: fmt,
    opt: _.size(opt) && opt,
    req: _.size(req) && req,
    sortOrder: _.size(req) * -1
  }, Boolean);
}

function pickDefaultMethod(opts, name) {

  function methodsAre(methods) {
    return _.size(_.intersection(opts, methods)) === _.size(opts);
  }

  function hasMethods(methods) {
    return _.size(_.intersection(opts, methods)) === _.size(methods);
  }

  if (opts.length === 1) return _.first(opts);

  // we need to define what the default method(s) will be
  if (hasMethods(['DELETE', 'POST'])) return 'POST';
  if (methodsAre(['DELETE'])) return 'DELETE';
  if (methodsAre(['POST', 'PUT'])) return name.match(/put/i) ? 'PUT' : 'POST';
  if (methodsAre(['GET', 'POST'])) return 'POST';
  if (methodsAre(['GET', 'HEAD'])) return 'GET';

  throw new Error('unable to pick a method for ' + name);
}


module.exports = Method;
