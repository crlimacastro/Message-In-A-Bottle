const serverUtils = require('./serverUtils/serverUtils.js');

const { MIMETypes } = serverUtils;

const jsonHandler = require('./jokes/jsonResponses.js');
const xmlHandler = require('./jokes/xmlResponses.js');

const getRandomJokeResponse = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);

  if (acceptedTypes.includes(MIMETypes.XML)) {
    serverUtils.respond(request, response, MIMETypes.XML, 200, xmlHandler.getRandomJoke());
  } else {
    serverUtils.respond(request, response, MIMETypes.JSON, 200, jsonHandler.getRandomJoke());
  }
};

const getRandomJokesResponse = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const params = serverUtils.getParams(request);

  if (acceptedTypes.includes(MIMETypes.XML)) {
    serverUtils.respond(request, response, MIMETypes.XML, 200, xmlHandler.getRandomJokes(params));
  } else {
    serverUtils.respond(request, response, MIMETypes.JSON, 200, jsonHandler.getRandomJokes(params));
  }
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
