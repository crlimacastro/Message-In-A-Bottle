const serverUtils = require('./utils/serverUtils.js');

const { MIMETYPES } = serverUtils;
const { File } = require('./utils/fileUtils.js');

const jsonHandler = require('./msgs/responses/jsonResponses.js');
const xmlHandler = require('./msgs/responses/xmlResponses.js');

const respondRandomMsg = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);

  if (acceptedTypes.includes(MIMETYPES.XML)) {
    const content = xmlHandler.getRandomMsg();
    const type = MIMETYPES.XML;
    const file = new File(content, type);

    serverUtils.respond(request, response, 200, file);
  } else {
    const content = jsonHandler.getRandomMsg();
    const type = MIMETYPES.JSON;
    const file = new File(content, type);

    serverUtils.respond(request, response, 200, file);
  }
};

// const getRandomJokesResponse = (request, response) => {
//   const acceptedTypes = serverUtils.getAcceptedTypes(request);
//   const params = serverUtils.getParams(request);

//   if (acceptedTypes.includes(MIMETYPES.XML)) {
//     const content = xmlHandler.getRandomJokes(params);
//     const type = MIMETYPES.XML;
//     const file = new File(content, type);

//     serverUtils.respond(request, response, 200, file);
//   } else {
//     const content = jsonHandler.getRandomJokes(params);
//     const type = MIMETYPES.JSON;
//     const file = new File(content, type);

//     serverUtils.respond(request, response, 200, file);
//   }
// };

// Contains endpoints
const urlResponses = {
  '/random-msg': respondRandomMsg,
};

module.exports = urlResponses;
