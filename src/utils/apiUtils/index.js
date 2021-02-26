// Classes
const APIError = require('./classes/APIError');
const APIJSONResponse = require('./classes/APIJSONResponse');

// JS
const apiResponseHandler = require('./js/apiResponseHandler.js');

module.exports = {
  APIError,
  APIJSONResponse,
  ...apiResponseHandler,
};
