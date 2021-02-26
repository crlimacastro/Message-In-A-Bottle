const url = require('url');
const query = require('querystring');

// #region URL Parse

/**
 * Returns object of the request's url parsed into different parts
 * Properties include:
 * Ex] pathname: '/your-path-name-here'
 * Ex] query: 'limit=10'
 * @returns {Object}
 */
const getParsedUrl = (request) => url.parse(request.url);

/** Returns url's pathname
 * @returns {String}
 */
const getPathname = (request) => getParsedUrl(request).pathname;

// #endregion

/**
 * Returns paramaters of GET request query string as properties of an object
 * @returns {Object}
 */
const getQueryParams = (request) => query.parse(getParsedUrl(request).query);

/**
 * Returns an object with paramaters of POST request
 * @param {Array} body POST request body array
 * @returns {Object}
 */
const getBodyParams = (body) => query.parse(Buffer.concat(body).toString());

/**
 * Returns ip address of client that sent the request
 * https://www.semicolonworld.com/question/44499/how-to-determine-a-user-39-s-ip-address-in-node
 */
const getIP = (request) => request.headers['x-forwarded-for']
    || request.connection.remoteAddress
    || request.socket.remoteAddress
    || request.connection.socket.remoteAddress.split(',')[0];

// #region Headers Parse

/** Returns array of accepted response types for the request
 * @returns {Array}
 */
const getAcceptedTypes = (request) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  return acceptedTypes;
};

// #endregion

module.exports = {
  // URL Parse
  getParsedUrl,
  getPathname,
  getQueryParams, // GET
  getBodyParams, // POST
  getIP,
  // Headers Parse
  getAcceptedTypes,
};
