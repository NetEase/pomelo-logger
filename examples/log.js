const log = require('../lib/logger');
log.configure(require('./log4js.json'), {serverId: 12});
let logger = log.getLogger('rpc-log', __filename);

logger.info('test1');
logger.warn('test2');
logger.error('test3');
log.getLogger('crash', __filename).error('one');