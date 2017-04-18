const config = require('../config')

global.frontful = global.frontful || {}
global.frontful.config = {
  browser: config.browser,
}
