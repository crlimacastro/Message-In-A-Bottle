// Utils
const fileUtils = require('../utils/fileUtils.js');
const serverUtils = require('../utils/serverUtils.js');
const xmlUtils = require('../utils/xmlUtils.js');

const { MIMETYPES } = serverUtils;
const { File } = fileUtils;

const dataHandler = require('../dataHandler.js');

// Functionality
const getRandomMsg = (userIP, topic) => dataHandler.popRandom(userIP, topic);

// Responses
const respondRandomMsg = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const userIP = serverUtils.getIP(request);
  const params = serverUtils.getParams(request);

  let content = getRandomMsg(userIP, params.topic);
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

  const type = MIMETYPES.JSON;
  const responseHeaders = { 'Content-Type': type };
  response.writeHead(204, responseHeaders); // 204 - No Content
  response.end();
  return response;
};

// Contains endpoints
const urlResponses = {
  '/random-msg': respondRandomMsg,
};

module.exports = urlResponses;
