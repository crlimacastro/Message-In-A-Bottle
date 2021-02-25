// Pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

// #region URL data

/**
 * Returns object of the request's url parsed into different parts
 * Properties include:
 * Ex] pathname: '/your-path-name-here'
 * Ex] query: 'limit=10' */
const getParsedUrl = (request) => url.parse(request.url);

/** Returns string of the request url's pathname */
const getPathname = (request) => getParsedUrl(request).pathname;

/** Returns an object with paramaters of query string as properties */
const getParams = (request) => query.parse(getParsedUrl(request).query);

/** Returns ip address of client that sent the request */
const getIP = (request) => request.connection.remoteAddress;
// #endregion

// #region Head data

/** Returns an array of all accepted response types for the request */
const getAcceptedTypes = (request) => {
    let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
    acceptedTypes = acceptedTypes || [];
    return acceptedTypes;
};

// #endregion

module.exports = {
    getParsedUrl,
    getPathname,
    getParams,
    getIP,
    getAcceptedTypes,
};