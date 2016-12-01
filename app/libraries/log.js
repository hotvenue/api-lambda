const config = require('config');
const moment = require('moment');
const winston = require('winston');

const configLog = config.get('log');

const loggerNames = [
  'default',
  'server',
  'db',
  'aws',
  'jobs',
  'telegram',
  'analyticsFrame',
];

// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
}

function loggerFactory(label) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        json: true,
        label,
        level: label === 'server' ? 'warn' : configLog.level,
        silent: label === 'analyticsFrame',
        timestamp,
      }),
    ],
  });
}

const log = module.exports = {};

loggerNames.forEach((loggerName) => {
  log[loggerName] = loggerFactory(loggerName);
});

Object.keys(log.default.levels).forEach((level) => {
  log[level] = log.default[level];
});
