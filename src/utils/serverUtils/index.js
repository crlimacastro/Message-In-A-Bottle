// CLASSES
const Server = require('./classes/Server.js');

// JS
const mimeParser = require('./js/mimeParser.js');
const requestParser = require('./js/requestParser.js');
const responseHandler = require('./js/responseHandler.js');
const responseMaker = require('./js/responseMaker.js');

module.exports = {
  Server,
  ...mimeParser,
  ...requestParser,
  ...responseHandler,
  ...responseMaker,
};
