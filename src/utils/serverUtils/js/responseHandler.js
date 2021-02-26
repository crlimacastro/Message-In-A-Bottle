const { ResponseFile } = require('../../fileUtils');

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

/**
 * Writes a server response and returns it
 * @param {Request} request
 * @param {Response} response
 * @param {Number} statusCode
 * @param {File} file
 * @returns {Response}
 */
const respond = (request, response, statusCode, file) => {
  if (file instanceof ResponseFile) {
    const { method } = request; // Get request method

    // Headers to be sent back
    const responseHeaders = {
      'Content-Type': file.type,
    };

    switch (method) {
      case 'HEAD':
        responseHeaders['Content-Length'] = getBinarySize(file.content);
        response.writeHead(statusCode, responseHeaders); // send response headers
        break;
      // Works for GET or POST
      default:
        response.writeHead(statusCode, responseHeaders); // send response headers
        response.write(file.content); // send content
        break;
    }

    response.end(); // close connection
    return response;
  }

  throw new TypeError('file is not of type File.');
};

module.exports = {
  respond,
};
