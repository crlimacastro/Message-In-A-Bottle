// External modules
const http = require('http');

// Internal modules
const jokeHandler = require('./jokeResponses.js');
const serverUtils = require('./serverUtils/serverUtils.js');

const { MIMETypes } = serverUtils;

const port = process.env.PORT || process.env.NODE_PORT || 3000; // Locally 3000, assigned on Heroku
const clientPath = `${__dirname}/../client/`; // path to client folder

// Make 404 response
const path404 = `${__dirname}/../client/error.html`; // path to 404 page
const page404 = serverUtils.readFileSync(path404);
const response404 = serverUtils.makeFileResponse(MIMETypes.HTML, 404, page404);

// Contains all server enpoints
const urlStruct = {
  notFound: response404,
  '/random-joke': jokeHandler.getRandomJokeResponse,
  '/random-jokes': jokeHandler.getRandomJokesResponse,
  // Spread all endpoints in client
  ...serverUtils.getFilesResponses(clientPath),
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
