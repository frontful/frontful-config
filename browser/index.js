let config = null

if (typeof window !== 'undefined') {
  if (window.frontful) {
    config = window.frontful.config
  }
} else if (typeof global !== 'undefined') {
  if (global.frontful) {
    config = global.frontful.config.browser
    config.getScript = function() {
      return `<script>window.frontful = window.frontful || {}; window.frontful.config = ${JSON.stringify(global.frontful.config.browser)};</script>`
    }
  }
}

module.exports = config
