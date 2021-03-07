// Utils
const serverUtils = require('../../utils/serverUtils');
const mathUtils = require('../../utils/mathUtils');
const apiUtils = require('../../utils/apiUtils');

const poolsHandler = require('../poolsHandler.js');
const usersHandler = require('../usersHandler.js');

const jsonResponses = require('../jsonResponses');
const errors = require('../errors');

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

/**
 * Deletes a message from a user's storage and returns it.
 * @param {String} userID
 * @param {String} msgID
 * @returns Object of message deleted.
 */
const forgetMsg = (userID, msgID) => usersHandler.forgetMsg(userID, msgID);

/**
 * Clears a user's saved messages storage.
 * @param {String} id The user's ID.
 */
const forgetAll = (id) => {
  usersHandler.forgetAll(id);
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

const respondForgetMsg = (request, response) => {
  switch (request.method) {
    case 'DELETE': {
      const params = serverUtils.getQueryParams(request);

      if (!params.id) {
        // 400 - Bad Request
        return apiUtils.respondAPIContent(request, response, 400, new errors.ParamUndefinedError());
      }

      const ip = serverUtils.getIP(request);
      const id = usersHandler.getUserID(ip);
      const deletedMsg = forgetMsg(id, params.id);

      // If a msg was actually deleted (null otherwise)
      if (deletedMsg) {
        // 200 - OK
        return apiUtils.respondAPIContent(request, response, 200,
          new jsonResponses.MsgDeletedResponse());
      }

      // 404 - Not Found
      return apiUtils.respondAPIContent(request, response, 404,
        new jsonResponses.MsgNotFoundResponse(params.id));
    }
    default:
      // 405 - Method Not Allowed
      return apiUtils.respondAPIContent(request, response, 405, new errors.RequestMethodError());
  }
};

const respondForgetAll = (request, response) => {
  switch (request.method) {
    case 'DELETE': {
      const ip = serverUtils.getIP(request);
      const id = usersHandler.getUserID(ip);
      forgetAll(id);
      return apiUtils.respondAPIContent(request, response, 200,
        new jsonResponses.PoolClearedResponse());
    }
    default:
      // 405 - Method Not Allowed
      return apiUtils.respondAPIContent(request, response, 405, new errors.RequestMethodError());
  }
};

// Contains endpoints
const urlResponses = {
  '/msg-random': respondRandomMsg,
  '/msg-received': respondReceivedMsgs,
  '/msg-forget': respondForgetMsg,
  '/msg-forget-all': respondForgetAll,
};

module.exports = urlResponses;
