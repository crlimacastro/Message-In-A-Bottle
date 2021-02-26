// Utils
const fileUtils = require('../../utils/fileUtils');
const serverUtils = require('../../utils/serverUtils');
const xmlUtils = require('../../utils/xmlUtils');

const dataHandler = require('../../dataHandler.js');

const { ResponseFile } = fileUtils;
const { MIMETYPES } = serverUtils;

// Functionality
const getRandomMsg = (userIP, topic) => dataHandler.popRandom(userIP, topic);
const getReceivedMsgs = (userIP) => dataHandler.getReceivedMessages(userIP);

// Responses
const respondRandomMsg = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const userIP = serverUtils.getIP(request);
  const params = serverUtils.getQueryParams(request);

  let content = getRandomMsg(userIP, params.topic);
  if (content) {
    if (acceptedTypes.includes(MIMETYPES.XML)) {
      content = xmlUtils.parseJSONToXML(content);
      const type = MIMETYPES.XML;
      const file = new ResponseFile(content, type);
      return serverUtils.respond(request, response, 200, file);
    }

    content = JSON.stringify(content);
    const type = MIMETYPES.JSON;
    const file = new ResponseFile(content, type);
    return serverUtils.respond(request, response, 200, file);
  }

  const type = MIMETYPES.JSON;
  const responseHeaders = { 'Content-Type': type };
  response.writeHead(204, responseHeaders); // 204 - No Content
  response.end();
  return response;
};

const respondReceivedMsgs = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const userIP = serverUtils.getIP(request);

  let content = getReceivedMsgs(userIP);
  if (content) {
    if (acceptedTypes.includes(MIMETYPES.XML)) {
      content = xmlUtils.parseJSONToXML(content);
      const type = MIMETYPES.XML;
      const file = new ResponseFile(content, type);
      return serverUtils.respond(request, response, 200, file);
    }

    content = JSON.stringify(content);
    const type = MIMETYPES.JSON;
    const file = new ResponseFile(content, type);
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
  '/received-msgs': respondReceivedMsgs,
};

module.exports = urlResponses;
