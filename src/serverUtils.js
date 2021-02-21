// Pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

// #region URL data

// Returns object of the request's url parsed into different parts
// Properties include:
// Ex] pathname: '/your-path-name-here'
// Ex] query: 'limit=10'
const getParsedUrl = (request) => url.parse(request.url);

// Returns string of the request url's pathname
const getPathname = (request) => getParsedUrl(request).pathname;

// Returns an object with paramaters of query string as properties
const getParams = (request) => query.parse(getParsedUrl(request).query);

// #endregion

// #region Head data

// Returns an array of all accepted response types for the request
const getAcceptedTypes = (request) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  return acceptedTypes;
};

// #endregion

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// Writes a server response and returns it
const respond = (request, response, type, statusCode, content) => {
  const { method } = request; // get request method

  // Headers to be sent back
  const responseHeaders = {
    'Content-Type': type,
  };

  switch (method) {
    case 'HEAD':
      responseHeaders['Content-Length'] = getBinarySize(content);
      response.writeHead(statusCode, responseHeaders); // send response headers
      break;
    // Default to GET request
    default:
      response.writeHead(statusCode, responseHeaders); // send response headers
      response.write(content); // send content
      break;
  }

  response.end(); // close connection
  return response;
};

module.exports = {
  respond,
  getParsedUrl,
  getPathname,
  getParams,
  getAcceptedTypes,
};
