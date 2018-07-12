const fs = require('fs')
const requireFromString = require('require-from-string')

module.exports = function requireFile(filename) {
  var content = fs.readFileSync(filename, 'utf8')
  return requireFromString(content, filename)
}
