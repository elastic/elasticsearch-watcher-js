
var _ = require('lodash');
var fs = require('fs');
var join = require('path').join;
var relative = require('path').relative;
var glob = require('glob');
var imports = _.clone(require('./templateHelpers'));

var rootDir = join(__dirname, '..');
var apiDir = join(rootDir, 'elasticsearch-watcher', 'rest-api-spec', 'api');
var tmplDir = join(rootDir, 'generate', 'templates');
var apiFile = join(rootDir, 'src', 'watcher.js');
var docFile = join(rootDir, 'docs', 'api.asciidoc');

var read = function (filename) { return fs.readFileSync(filename, 'utf8'); };
var parseJson = function (contents) { return JSON.parse(contents); };
var Method = require('./Method');

var methods = glob
.sync(join(apiDir, 'watcher.*.json'))
.map(read)
.map(parseJson)
.map(function (spec) {
  var name = Object.keys(spec).shift();
  return new Method(name, spec[name]);
});

glob.sync(join(tmplDir, '*.tmpl')).forEach(function (filename) {
  var file = relative(tmplDir, filename);
  var name = file.replace(/\.tmpl/, 'Tmpl');
  var tmpl;
  imports[name] = function (locals) {
    tmpl || (tmpl = _.template(read(filename), { sourceURL: filename, imports: imports }));
    return tmpl(locals);
  };
});

fs.writeFileSync(apiFile, imports.apiFileTmpl({ methods: methods }));
fs.writeFileSync(docFile, imports.docFileTmpl({ methods: methods }));
