pomelo-logger
========

pomelo-logger is a [log4js](https://github.com/nomiddlename/log4js-node) wrapper for [pomelo](https://github.com/NetEase/pomelo) which provides some useful features.  

## Installation
```
npm install pomelo-logger
```

## Features
### config
in pomelo, you just configure the log4js file  
```json
{
  "appenders": {
    "console": {
      "type": "console",
      "layout": {
        "type": "pattern",
        "pattern": "%[[%d{yyyy-MM-dd hh:mm:ss}]-[%p]-[pid=%z]-[%f{1}-%l] %m%]"
      }
    },
    "rpc-log": {
      "type": "dateFile",
      "filename": "./logs/rpc-log-${opts:serverId}.log",
      "alwaysIncludePattern": true,
      "pattern": "yyyy-MM-dd.log",
      "layout": {
        "type": "pattern",
        "pattern": "%[[%d{yyyy-MM-dd hh:mm:ss}]-[%p]-[pid=%z]-[%f{2}-%l] %m%]"
      }
    },
    "crash": {
      "type": "file",
      "filename": "./logs/crash.log",
      "maxLogSize": 31457280,
      "backups": 5,
      "layout": {
        "type": "pattern",
        "pattern": "%[[%d{yyyy-MM-dd hh:mm:ss}]-[%p]-[pid=%z]-[%f-%l] %m%]"
      }
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "console"
      ],
      "level": "debug",
      "enableCallStack": true
    },
    "rpc-log": {
      "appenders": [
        "rpc-log",
        "console"
      ],
      "level": "error",
      "enableCallStack": true
    },
    "crash": {
      "appenders": [
        "crash",
        "console"
      ],
      "level": "error",
      "enableCallStack": true
    }
  },
  "rawMessage": false,
  "reloadSecs": 180
}
```

### log raw messages
in raw message mode, your log message will be simply your messages, no prefix and color format strings  
to use this feature, add this code  
```
process.env.RAW_MESSAGE = true;
```

in pomelo, you just configure the log4js file and set **rawMessage** for true  
```
{
  "appenders": [
  ],

  "categories": {
  }, 

  "replaceConsole": true,

  "rawMessage": true
}
```
### log prefix
besides category, you can output prefix as you like in your log  
prefix can be filename, serverId, serverType, host etc  
to use this feature, you just pass prefix params to getLogger function  
```
var logger = require('pomelo-logger').getLogger(category, prefix1, prefix2, ...);
```
 log output msg will output with prefix ahead   

### dynamic configure logger level
in pomelo logger configuration file log4js.json, you can add reloadSecs option. The reloadSecs means reload logger configuration file every given time. For example
```
{
	"reloadSecs": 30
}
```
the above configuration means reload the configuration file every 30 seconds. You can dynamic change the logger level, but it does not support dynamiclly changing configuration of appenders.

## Example
log.js
```
var logger = require('pomelo-logger').getLogger('log', __filename, process.pid);

logger.info('test1');
logger.warn('test2');
logger.error('test3');
```

## License
(The MIT License)

Copyright (c) 2012-2013 NetEase, Inc. and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
