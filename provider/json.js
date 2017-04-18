const fs = require('fs')

module.exports = function provider(filename) {
  var object = null

  if (fs.existsSync(filename)) {
    object = JSON.parse(fs.readFileSync(filename, 'utf8'))
  }

  return object
}
