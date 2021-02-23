// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

/** Writes a server response and returns it */
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
};
