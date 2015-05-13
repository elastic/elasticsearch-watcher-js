module.exports = ParamList;

var _ = require('lodash');
var camelCase = require('camelcase');

function ParamList(vals) {
  var self = this;

  _.forOwn(vals, function (param, oldKey) {
    var name = camelCase(oldKey);
    self[name] = param;

    if (name !== oldKey) param.name = oldKey;
    if (param.default) {
      param.nameWithDefault = '[' + param.name + '=' + param.default + ']';
    } else {
      param.nameWithDefault = name;
    }

    param.toJSON = function () {
      return _.pick(param, 'name', 'type', 'default', 'options', 'required');
    };

  });
}
