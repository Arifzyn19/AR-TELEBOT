const chalk = require('chalk');
const util = require('util');

const logger = {
  info(...args) {
    console.log(
      chalk.bold.bgRgb(51, 204, 51)('INFO '),
      chalk.cyan(util.format(...args))
    );
  },
  error(...args) {
    console.log(
      chalk.bold.bgRgb(247, 38, 33)('ERROR '),
      chalk.rgb(255, 38, 0)(util.format(...args))
    );
  },
  warn(...args) {
    console.log(
      chalk.bold.bgRgb(255, 153, 0)('WARNING '),
      chalk.redBright(util.format(...args))
    );
  },
  trace(...args) {
    console.log(
      chalk.grey('TRACE '),
      chalk.white(util.format(...args))
    );
  },
  debug(...args) {
    console.log(
      chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
      chalk.white(util.format(...args))
    );
  },
};

module.exports = logger; 