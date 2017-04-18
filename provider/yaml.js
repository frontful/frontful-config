const fs = require('fs')
const yaml = require('js-yaml')

module.exports = function provider(filename) {
  var object = null

  if (fs.existsSync(filename)) {
    object = yaml.load(fs.readFileSync(filename, 'utf8'))
  }

  return object
}
