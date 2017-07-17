# <a href="https://github.com/frontful/frontful-config"><img heigth="75" src="http://www.frontful.com/assets/packages/config.png" alt="Frontful Config" /></a>

[`frontful-config`](https://github.com/frontful/frontful-config) is configuration provider for isomorphic applications, packages and [Frontful](https://github.com/frontful) infrastructure. `frontful-config` has two parts, configuration provider for applications (server and browser), and configuration provider for packages. Configuration is done in `package.json` or custom `.js`, `.json` or `.yaml` files.

Configuration does not get bundled with application and you can swap files after build. This results in few benefits
  - Application environment agnostic build
  - Configuration based on features and not application environment
  - Application environment e.g. production specific secrets and credentials can be stored outside application code. Development config can by replaced by environment specific one deployment

### Mechanics

Create property in `package.json` that contains configuration object or that points to configuration file. Frontful infrastructure uses convention of `frontful` property with sub-properties `environment`, `config`, `common`, `babel` for packages. You can create your own convention for your packages.
```javascript
// package.json
{
  "frontful": {
    "environment": {...}, // Configuration object
    "config": "./config.js" // Configuration file
  }
}
```
Frontful infrastructures package configuration objects or files will be automatically consumed by that package and exposed if at all in an interpreted form.

If you want to consume configuration objects as is or in your own package use `frontful-config/provider` utility, e.g.
```javascript
import provider from `frontful-config/provider`
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

#### Configuration provider for packages

Create your own configuration property in `package.json` and extract it using `frontful-config/provider` utility
```javascript
// package.json
{
  "my_config": ... // Configuration object or file
}
```
```javascript
import provider from `frontful-config/provider`
const config = provider('my_config')
```

#### Configuration provider for applications

1. Create configuration file as `.js`, `.json` or `.yaml` file and specify name of config file in `frontful.config` property in `package.json`. `frontful.config` must contain three properties to ensure that potential secrets and credentials needed on server do not get exposed in browser
    - `browser` - config object available in browser and on server as `frontful-config/browser`
    - `common` - config object will be merged with `browser` and `server` properties
    - `server` - config object available on server only as `frontful-config/server`

```javascript
// config.js ES5
module.exports = {
  browser: {},
  common: {},
  server: {}
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
If you don't want separate file for configuration you can specify entire config object in `package.json` directly
```javascript
// package.json
{
  "frontful": {
    "config": {
      "browser": {},
      "common": {},
      "server": {}
    }
  }
}
```
2. Import `frontful-config` initialization script, this should be done in first entry point into server and before any other calls to `frontful-config`.  
**Skip this step if using `frontful-environment` as it has been done internally**
```javascript
import 'frontful-config'
```
3. Explicitly inject browser side configuration into `html`.  
`frontful-config/browser` `getScript()` returns stringified `script` tag with serialized content of browser side config object
```javascript
import browserConfig from 'frontful-config/browser'
const html = `
  <html>
    <body>
      ...
      ${browserConfig.getScript()}
      <!-- Other bundles that depend on configuration -->
    </body>
  </html>
`
```
4. Import configuration
  - `frontful-config/browser` - for code that runs on browser and server. This config contains all configuration properties from `browser` and `common` sections
  - `frontful-config/server` - for code that runs on server only. This config contains all configuration properties from `server` and `common` sections.  
  **If you import `frontful-config/server` in file that gets bundled for browser you'll get an Error**
```javascript
import browserConfig from 'frontful-config/browser'
import serverConfig from 'frontful-config/server'
```
