const fs = require('fs')
const requireFile = require('./utils/requireFile')

module.exports = function provider(filename) {
  var object = null

  if (fs.existsSync(filename)) {
    object = requireFile(filename)
  }

  return object
}
