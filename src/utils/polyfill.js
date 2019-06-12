if (!String.prototype.includes) {
  String.prototype.includes = function() {
    return this.indexOf(...arguments) > -1
  }
}
if (!Array.prototype.includes) {
  Array.prototype.includes = function() {
    return this.indexOf(...arguments) > -1
  }
}
if (!Object.entries) {
  Object.entries = function(obj) {
    return Object.keys(obj).map(k => [k, obj[k]])
  }
}
