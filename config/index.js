const deepExtend = require('deep-extend')
const providerPackage = require('../provider/package')

const config = providerPackage('frontful.config') || {}

module.exports = {
  browser: deepExtend({}, config.common, config.browser),
  server: deepExtend({}, config.common, config.server),
}
