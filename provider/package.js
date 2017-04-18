const objectPath = require('object-path')
const packageJSON = objectPath(require('../config/package'))
const file = require('./file')

module.exports = function provider(path) {
  const value = packageJSON.get(path)
  if (value) {
    if (typeof value === 'string') {
      return file(value)
    }
    else {
      return value
    }
  }
  else {
    return null
  }
}
