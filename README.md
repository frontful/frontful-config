# <a href="https://github.com/frontful/frontful-config"><img heigth="75" src="http://www.frontful.com/assets/packages/config.png" alt="Frontful Config" /></a>

[`frontful-config`](https://github.com/frontful/frontful-config) is configuration provider for isomorphic applications and [Frontful](https://github.com/frontful) infrastructure. `frontful-config` has two parts, configuration provider for application server and browser code, and provider for package configuration. Configuration can be done in `package.json` or custom `.js`, `.json` or `.yaml` file

### Mechanics

Create property in `package.json` that contains your configuration object in place or point to your configuration file. Frontful infrastructure uses `frontful` property with sub properties for packages e.g. `environment` or `config`.
```javascript
// package.json
{
  "frontful": {
    "environment": {...}, // In place configuration object
    "config": "./config.js" // Pointer to configuration .js, .json or .yaml file
  }
}
```
In context of Frontful infrastructure configuration objects will be automatically consumed by appropriate package and exposed in interpreted way.  
If you want to consume configuration objects directly or in your own package, use `frontful-config/provider/package`
```javascript
import provider from `frontful-config/provider/package`
const config = provider('frontful.config')
```

### Installation

```shell
# Using yarn
yarn add frontful-config
# or npm
npm install -s frontful-config
```

### Integration

##### Configuration provider for application

1. Create configuration file as ES5 `.js`, `.json` or `.yaml` file and specify name of config file in `package.json` in `frontful.config` property.  
`frontful.config` must contain three properties
  - `browser` - config will be available in the browser and server as `frontful-config/browser`
  - `common` - config will be available in the browser and server
  - `server` - config will be available on the server only as `frontful-config/server`
```javascript
// config.js
module.exports = {
  browser: {...},
  common: {...},
  server: {...}
}
```
```javascript
// package.json
{
  "frontful": {
    "config": "./config.js"
  }
}
```
If you don't want or need separate file for configuration, you can specify entire config in `package.json`
```javascript
// package.json
{
  "frontful": {
    "config": {
      "browser": {...},
      "common": {...},
      "server": {...}
    }
  }
}
```
2. Import `frontful-config` initialization script, this should be done in first entry point into server and before any other calls to `frontful-config`.  
**Skip this step if using `frontful-environment`, it has been done internally**
```javascript
import 'frontful-config'
```

3. Explicitly inject browser side configuration into `html`.  
`frontful-config/browser` `getScript()` returns `script` tag with serialized content of browser side config
```javascript
import browserConfig from 'frontful-config/browser'
const html = `
  <html>
    <body>
      <div id="app"></div>
      ${browserConfig.getScript()}
      <!-- other bundles that depend on configuration -->
    </body>
  </html>
`
```

4. Import configuration
  - `frontful-config/browser` - for code that runs on browser and server. This config contains all configuration properties from `browser` and `common` sections
  - `frontful-config/server` - for code that runs on server only. This config contains all configuration properties from `server` and `common` sections. **If you import `frontful-config/server` in file that gets bundeled for browser you'll get an Error**
```javascript
import browserConfig from 'frontful-config/browser'
import serverConfig from 'frontful-config/server'
```

##### Configuration provider for package

```javascript
import provider from `frontful-config/provider/package`
const config = provider('my_config')
```
