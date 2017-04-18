const json = require('../provider/json')
const path = require('path')

module.exports = json(path.resolve(process.cwd(), 'package.json'))
