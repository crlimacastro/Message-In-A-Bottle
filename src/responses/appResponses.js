// Utils
const fileUtils = require('../utils/fileUtils.js');
const serverUtils = require('../utils/serverUtils.js');
const xmlUtils = require('../utils/xmlUtils.js');

const { MIMETYPES } = serverUtils;
const { File } = fileUtils;

const msgPool = require('../msgPool.js');

// Errors
const EmptyPoolError = require('./errors/emptyPoolError.js');

// Functionality
const getRandomMsg = () => msgPool.popRandom();

// Responses
const respondRandomMsg = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);

  let content = getRandomMsg();
  if (content) {
    if (acceptedTypes.includes(MIMETYPES.XML)) {
      content = xmlUtils.parseJSONToXML(content);
      const type = MIMETYPES.XML;
      const file = new File(content, type);
      return serverUtils.respond(request, response, 200, file);
    }

    content = JSON.stringify(content);
    const type = MIMETYPES.JSON;
    const file = new File(content, type);
    return serverUtils.respond(request, response, 200, file);
  }

  content = JSON.stringify(new EmptyPoolError());
  const type = MIMETYPES.JSON;
  const file = new File(content, type);
  return serverUtils.respond(request, response, 500, file);
};

// Contains endpoints
const urlResponses = {
  '/random-msg': respondRandomMsg,
};

module.exports = urlResponses;
