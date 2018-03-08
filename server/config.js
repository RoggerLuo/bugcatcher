'use strict';

const config = {
  port: '8787',
  // host: 'localhost',
  host: '47.75.9.249',
  mongo: {
    uri: 'mongodb://localhost/bugCatcher',
    opts: {
      user: '',
      pass: '',
      server: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 3000
      }
    }
  },
  log4js: {
    appenders: [{
      type: 'console'
    }, {
      type: 'dateFile',
      filename: 'logs/bugCatcher.log',
      pattern: '-yyyy-MM-dd',
      alwaysIncludePattern: false
    }],
    replaceConsole: true
  }
}

module.exports = config;