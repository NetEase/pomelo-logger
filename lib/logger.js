var log4js = require('log4js');
var fs = require('fs');

var DEFAULT_CONFIG_FILE = './config/log4js.json';

var funcs = {
	'env': doEnv, 
	'args': doArgs, 
	'opts': doOpts
};

function getLogger(categoryName) {
	if(typeof categoryName === 'string') {
		// category name is __filename then cut the prefix path
		categoryName = categoryName.replace(process.cwd(), '');
	}

	return log4js.getLogger(categoryName);
}

function configure(config, opts) {
	config = config || process.env.LOG4JS_CONFIG;
	opts = opts || {};

	if(!config && fs.existsSync(DEFAULT_CONFIG_FILE)) {
		config = DEFAULT_CONFIG_FILE;
	}

	if(typeof config === 'string') {
		config = JSON.parse(fs.readFileSync(config, "utf8"));
	}

	if(config) {
		config = replaceProperties(config, opts);
	}

	// config object could not turn on the auto reload configure file in log4js
	log4js.configure(config, opts);
}

function replaceProperties(configObj, opts) {
	if(configObj instanceof Array) {
		for(var i=0, l=configObj.length; i<l; i++) {
			configObj[i] = replaceProperties(configObj[i], opts);
		}
	} else if(typeof configObj === 'object') {
		var field;
		for(var f in configObj) {
			if(!configObj.hasOwnProperty(f)) {
				continue;
			}

			field = configObj[f];
			if(typeof field === 'string') {
				configObj[f] = doReplace(field, opts);
			} else if(typeof field === 'object') {
				configObj[f] = replaceProperties(field, opts);
			}
		}
	}

	return configObj;
}

function doReplace(src, opts) {
	if(!src) {
		return src;
	}

	var ptn = /\$\{(.*?)\}/g;
	var m, pro, ts, scope, name, func, res = '', lastIndex = 0;
	while((m = ptn.exec(src))) {
		pro = m[1];
		ts = pro.split(':');
		if(ts.length !== 2) {
			res += pro;
			continue;
		}
		
		scope = ts[0];
		name = ts[1];

		func = funcs[scope];
		if(!func && typeof func !== 'function') {
			res += pro;
			continue;
		}

		res += src.substring(lastIndex, m.index);
		lastIndex = ptn.lastIndex;
		res += func(name, opts);
	}

	if(lastIndex < src.length) {
		res += src.substring(lastIndex);
	}

	return res;
}

function doEnv(name) {
	return process.env[name];
}

function doArgs(name) {
	return process.argv[name];
}

function doOpts(name, opts) {
	return opts ? opts[name] : undefined;
}

module.exports = {
    getLogger: getLogger,
    getDefaultLogger: log4js.getDefaultLogger,

    addAppender: log4js.addAppender,
    loadAppender: log4js.loadAppender,
    clearAppenders: log4js.clearAppenders,
    configure: configure,

    replaceConsole: log4js.replaceConsole,
    restoreConsole: log4js.restoreConsole,

    levels: log4js.levels,
    setGlobalLogLevel: log4js.setGlobalLogLevel,

    layouts: log4js.layouts,
};

process.env.xxx = 'hello';
process.env.aaa = 'shit';
configure();

var logger = module.exports.getLogger(__filename);
logger.info('hello');