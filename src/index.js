const serverUtils = require('./serverUtils/serverUtils.js');

const { Server } = serverUtils;
const jokesHandler = require('./jokesResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000; // Locally 3000, assigned on Heroku

// Important paths
const pathClient = `${__dirname}/../client/`; // path to client folder
const pathIndex = `${__dirname}/../client/index.html`; // path to index page
const path404 = `${__dirname}/../client/error.html`; // path to 404 page

// Contains all server enpoints
const urlStruct = {
  notFound: serverUtils.makePathResponse(404, path404),
  '/': serverUtils.makePathResponse(200, pathIndex),
  '/random-joke': jokesHandler.getRandomJokeResponse,
  '/random-jokes': jokesHandler.getRandomJokesResponse,
  // Spread all endpoints in client
  ...serverUtils.getFilesResponses(pathClient),
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

const server = new Server(onRequest);
server.init(port);
