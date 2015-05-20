var _ = require('lodash');
var fs = require('fs');
var join = require('path').join;

var docsDir = join(__dirname, '..', 'docs');

/**
 * we want strings in code to use single-quotes, so this will JSON encode vars, but then
 * modify them to follow our code standards.
 *
 * @param  {*} thing - Any thing
 * @return {String}  - our pretty string
 */
function stringify(thing, pretty) {
  return (pretty ? JSON.stringify(thing, null, '  ') : JSON.stringify(thing))
    .replace(/\'/g, '\\\'')
    .replace(/\\?"/g, function (quote) {
      // replace external (unescaped) double quotes with single quotes
      return quote === '\\"' ? '"' : '\'';
    })
    // inject a space between STRING array parts
    .replace(/([^\\])','/g, '$1\', \'')
    // remove quotes around key names that are only made up of letters
    .replace(/^( +)'([a-zA-Z_]+)':/gm, '$1$2:')
    // requote "special" key names
    .replace(/^( +)(default):/gm, '$1\'$2\':');
}

function repeat(str, count) {
  return (new Array(count + 1)).join(str);
}

function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

function getPartial(name) {
  return function (action) {
    try {
      return fs.readFileSync(join(docsDir, '_' + name + 's', action + '.asciidoc'), 'utf8').trim();
    } catch (e) {
      if (~e.message.indexOf('ENOENT')) {
        return '// no ' + name;
      } else {
        throw e;
      }
    }
  };
}

/**
 * These keys will be available as local variables to each template
 * @type {Object}
 */
module.exports = {

  stringify: stringify,

  _: _,

  indent: function (block, spaces) {
    var indent = repeat(' ', spaces);
    return block.split('\n').map(function (line) {
      return !line.trim() ? '' : indent + line;
    }).join('\n');
  },

  joinParagraphs: function (block) {
    return block.split('\n\n').join('\n+\n');
  },

  description: getPartial('description'),
  examples: getPartial('example'),

  paramType: function (type) {
    switch (type && type.toLowerCase ? type.toLowerCase() : 'any') {
    case 'time':
      return 'Date, Number';
    case 'any':
      return 'Anything';
    case 'enum':
      return 'String';
    case 'list':
      return 'String, String[], Boolean';
    default:
      return ucfirst(type);
    }
  },

  paramWithDefault: function (name, def) {
    if (def) {
      return '[' + name + '=' + def + ']';
    } else {
      return name;
    }
  }
};
