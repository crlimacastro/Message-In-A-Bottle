// Utils
const serverUtils = require('../../utils/serverUtils');
const apiUtils = require('../../utils/apiUtils');

const poolsHandler = require('../poolsHandler.js');
const usersHandler = require('../usersHandler.js');

// Functionality
const getRandomMsg = (userIP, topic) => {
  const msg = poolsHandler.popRandom(topic); // Get msg
  usersHandler.saveMsg(msg, userIP); // Save msg for user
  return msg; // Return the msg
};

/** Returns messages received by a user */
const getReceivedMsgs = (userIP) => {
  const id = usersHandler.getUserID(userIP);
  const receivedMsgs = usersHandler.getSavedMsgs(id);
  return receivedMsgs;
};

// Responses
const respondRandomMsg = (request, response) => {
  const userIP = serverUtils.getIP(request);
  const params = serverUtils.getQueryParams(request);

  const content = getRandomMsg(userIP, params.topic);
  if (content) {
    // 200 - OK
    return apiUtils.respondAPIContent(request, response, 200, content);
  }

  // 204 - No Content
  return serverUtils.respondNoContent(request, response);
};

const respondReceivedMsgs = (request, response) => {
  const userIP = serverUtils.getIP(request);

  const content = getReceivedMsgs(userIP);
  if (content) {
    return apiUtils.respondAPIContent(request, response, 200, content);
  }

  // 204 - No Content
  return serverUtils.respondNoContent(request, response);
};

// Contains endpoints
const urlResponses = {
  '/msg-random': respondRandomMsg,
  '/msg-received': respondReceivedMsgs,
};

module.exports = urlResponses;
