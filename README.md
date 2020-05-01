![Travis Build](https://img.shields.io/travis/com/7wf/ise) ![GitHub last commit](https://img.shields.io/github/last-commit/7wf/ise)

### Ise

A simple logging library.

#### Installing

```sh
# NPM
npm i ise

# Yarn
yarn add ise
```

If do you want to use colors (ConsoleTransport):

```sh
# NPM
npm i ise kleur

# Yarn
yarn add ise kleur
```

#### Usage

```js
// CommonJS
const { Ise } = require('ise')

// ES6
import { Ise } from 'ise'

const logger = new Ise()

// Logging with message only
logger.log('info', 'Hello, world.')
logger.log('warn', 'Hello, world.')
logger.log('debug', 'Hello, world.')
logger.log('error', 'Hello, world.')

// Logging with extra properties.
const error = new Error('Something wrong happened.')
logger.log('error', {
    message: error.message // the field `message` is required.
    error
})

// Using a transport from Ise
import { Transports } from 'ise'
const { ConsoleTransport } = Transports.Console

logger.use(new ConsoleTransport({ timestamp: false }))
```

#### License

[MIT](/LICENSE) &copy; Itallo Gabriel (https://github.com/7wf)
