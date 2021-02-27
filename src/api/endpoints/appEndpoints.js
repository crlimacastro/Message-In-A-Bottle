// Utils
const serverUtils = require('../../utils/serverUtils');
const mathUtils = require('../../utils/mathUtils');
const apiUtils = require('../../utils/apiUtils');

const poolsHandler = require('../poolsHandler.js');
const usersHandler = require('../usersHandler.js');

const jsonResponses = require('../jsonResponses');

// Functionality
const getRandomMsg = (userIP, topic) => {
  const msg = poolsHandler.popRandom(topic); // Get msg
  usersHandler.saveMsg(msg, userIP); // Save msg for user
  return msg; // Return the msg
};

/** Returns Pool Page of messages received by a user */
const getReceivedMsgs = (userIP, limit, page) => {
  const id = usersHandler.getUserID(userIP);

  // Clean limit
  let lim = Number(limit); // cast limit to a number
  const count = usersHandler.savedMsgsCount(id); // get array length
  lim = mathUtils.clamp(lim, 1, count); // clamp between 1 and array length
  lim = Math.floor(lim); // make sure it is an integer

  const totalPages = Math.ceil(usersHandler.savedMsgsCount(id) / lim); // Get total amount of pages

  // Clean page
  let pg = Number(page); // cast page to a number
  pg = mathUtils.clamp(pg, 0, totalPages - 1); // clamp between 0 and page total
  pg = Math.floor(pg); // make sure it is an integer

  const offset = lim * pg; // Get peek offset
  const messages = usersHandler.peekSavedMsgs(id, lim, offset); // Get slice of messages
  const pageObj = new jsonResponses.PoolPageResponse(messages, totalPages, pg); // Make page obj
  return pageObj;
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

  if (params.topic) {
    // 200 - OK
    return apiUtils.respondAPIContent(request, response, 200,
      new jsonResponses.TopicEmptyResponse());
  }

  // 200 - OK
  return apiUtils.respondAPIContent(request, response, 200, new jsonResponses.PoolEmptyResponse());
};

const respondReceivedMsgs = (request, response) => {
  const userIP = serverUtils.getIP(request);
  const params = serverUtils.getQueryParams(request);
  const content = getReceivedMsgs(userIP, params.limit, params.page);
  if (content) {
    // 200 - OK
    return apiUtils.respondAPIContent(request, response, 200, content);
  }

  // 200 - OK
  return apiUtils.respondAPIContent(request, response, 200, new jsonResponses.NoSavedMsgResponse());
};

// Contains endpoints
const urlResponses = {
  '/msg-random': respondRandomMsg,
  '/msg-received': respondReceivedMsgs,
};

module.exports = urlResponses;
