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
