const serverUtils = require('./serverUtils/serverUtils.js');
const { File, MIMETYPES } = serverUtils;

const jsonHandler = require('./jokes/jsonResponses.js');
const xmlHandler = require('./jokes/xmlResponses.js');

const getRandomJokeResponse = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);

  if (acceptedTypes.includes(MIMETYPES.XML)) {
    const content = xmlHandler.getRandomJoke();
    const type = MIMETYPES.XML;
    const file = new File(content, type);

    serverUtils.respond(request, response, 200, file);
  } else {
    const content = jsonHandler.getRandomJoke();
    const type = MIMETYPES.JSON;
    const file = new File(content, type);

    serverUtils.respond(request, response, 200, file);
  }
};

const getRandomJokesResponse = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const params = serverUtils.getParams(request);

  if (acceptedTypes.includes(MIMETYPES.XML)) {
    const content = xmlHandler.getRandomJokes(params);
    const type = MIMETYPES.XML;
    const file = new File(content, type);

    serverUtils.respond(request, response, 200, file);
  } else {
    const content = jsonHandler.getRandomJokes(params);
    const type = MIMETYPES.JSON;
    const file = new File(content, type);

    serverUtils.respond(request, response, 200, file);
  }
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
