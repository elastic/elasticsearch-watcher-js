module.exports = Catcher;

var RE_STRING_RE = /^\/(.*)\/$/;
var NUMERIC_RE = /^[0-9]+$/;

function Catcher(setting) {
  if (!setting) return;

  if (setting === 'missing') {
    this.status = 404;
  }

  else if (setting === 'conflict') {
    this.status = 409;
  }

  else if (setting === 'forbidden') {
    this.status = 403;
  }

  else if (NUMERIC_RE.test(setting)) {
    this.status = parseFloat(setting);
  }

  else if (setting === 'param') {
    this.type = TypeError;
  }

  else if (setting === 'request') {
    this.regexp = /.*/;
  }

  else if (RE_STRING_RE.test(setting)) {
    this.regexp = new RegExp(RE_STRING_RE.exec(setting)[1]);
  }
}
