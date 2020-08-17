const winston = require('winston');

const levels = {
  error: 0,
  warning: 1,
  info: 2,
};

// winston.configure({
//   exitOnError: false,
//   levels,
//   colors: {
//     error: 'red',
//     warning: 'yellow',
//     info: 'green',
//   },
//   transports: [
//     new (winston.transports.Console)({
//       colorize: true,
//     }),
//     new winston.transports.File({
//       filename: '../log',
//       name: 'log',
//       json: false,
//       maxsize: 10485760, // 1 MB
//       maxFiles: 5,
//     }),
//   ],
// });


class Log {

  static error(...args) {
    console.error(`${new Date()} ${args}`);
    // winston.error(`${new Date()} ${args}`);
  }

  static warning(...args) {
    console.warn(`${new Date()} ${args}`);
    // winston.warning(`${new Date()} ${args}`);
  }

  static info(...args) {
    console.log(`${new Date()} ${args}`);
    // winston.info(`${new Date()} ${args}`);
  }

  static database(...err) {
    console.log(...err);
    // winston.error(...err);
  }
}

module.exports = Log;
