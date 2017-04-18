const js = require('./js')
const json = require('./json')
const path = require('path')
const yaml = require('./yaml')

module.exports = function provider(filename) {
  const extension = path.extname(filename)

  switch (extension) {
    case '.js':
      return js(filename)
    case '.json':
      return json(filename)
    case '.yaml':
    case '.yml':
      return yaml(filename)
    default:
      return null
  }
}
