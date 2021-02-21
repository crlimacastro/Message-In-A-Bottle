// External modules
const http = require('http');

// Internal modules
const cssHandler = require('./responses/cssResponses.js');
const htmlHandler = require('./responses/htmlResponses.js');
const jokeHandler = require('./responses/jokeResponses.js');
const serverUtils = require('./serverUtils.js');

// Locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Contains all server enpoints
const urlStruct = {
  '/random-joke': jokeHandler.getRandomJokeResponse,
  '/random-jokes': jokeHandler.getRandomJokesResponse,
  '/default-styles.css': cssHandler.getDefaultStyles,
  notFound: htmlHandler.get404Response,
};

// This is the function that will be called every time a client request comes in
const onRequest = (request, response) => {
  // Get url data
  const pathname = serverUtils.getPathname(request);

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

// Create the server
// Hook up the request handling function
// Start listening on `port`
http.createServer(onRequest).listen(port);
