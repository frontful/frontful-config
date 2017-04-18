const fs = require('fs')

module.exports = function provider(filename) {
  var object = null

  if (fs.existsSync(filename)) {
    object = require(filename)
  }

  return object
}
