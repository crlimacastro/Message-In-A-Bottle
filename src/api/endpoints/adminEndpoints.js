// Utils
const serverUtils = require('../../utils/serverUtils');
const mathUtils = require('../../utils/mathUtils');
const apiUtils = require('../../utils/apiUtils');

const jsonResponses = require('../jsonResponses');
const errors = require('../errors');

const poolsHandler = require('../poolsHandler.js');

// Functionality
const getPoolPage = (limit, page) => {
  // Clean limit
  let lim = Number(limit); // cast limit to a number
  lim = mathUtils.clamp(lim, 1, poolsHandler.mainCount()); // clamp between 1 and array length
  lim = Math.floor(lim); // make sure it is an integer

  const totalPages = Math.ceil(poolsHandler.mainCount() / lim); // Get total amount of pages

  // Clean page
  let pg = Number(page); // cast page to a number
  pg = mathUtils.clamp(pg, 0, totalPages - 1); // clamp between 0 and page total
  pg = Math.floor(pg); // make sure it is an integer

  const offset = lim * pg; // Get peek offset
  const messages = poolsHandler.peek(lim, offset); // Get slice of messages
  const pageObj = new jsonResponses.PoolPageResponse(messages, totalPages, pg); // Make page obj
  return pageObj;
};

const poolDeleteMsg = (id) => poolsHandler.deleteMsg(id);

const clearPool = () => {
  poolsHandler.clear();
};

// Responses
const respondPoolPage = (request, response) => {
  const params = serverUtils.getQueryParams(request);

  if (!params.limit || !params.page) {
    // 400 - Bad Request
    return apiUtils.respondAPIContent(request, response, 400, new errors.ParamUndefinedError());
  }

  const content = getPoolPage(params.limit, params.page);
  return apiUtils.respondAPIContent(request, response, 200, content);
};

const respondPoolDelete = (request, response) => {
  switch (request.method) {
    case 'DELETE': {
      const params = serverUtils.getQueryParams(request);

      if (!params.id) {
        // 400 - Bad Request
        return apiUtils.respondAPIContent(request, response, 400, new errors.ParamUndefinedError());
      }

      const deletedMsg = poolDeleteMsg(params.id);

      // If a msg was actually delted (null otherwise)
      if (deletedMsg) {
        // 200 - OK
        return apiUtils.respondAPIContent(request, response, 200,
          new jsonResponses.MsgDeletedResponse());
      }

      // 204 - No Content
      return serverUtils.respondNoContent(request, response);
    }
    default:
      // 405 - Method Not Allowed
      return apiUtils.respondAPIContent(request, response, 405, new errors.RequestMethodError());
  }
};

const respondPoolClear = (request, response) => {
  switch (request.method) {
    case 'DELETE':
      clearPool();
      return apiUtils.respondAPIContent(request, response, 200,
        new jsonResponses.PoolClearedResponse());
    default:
      // 405 - Method Not Allowed
      return apiUtils.respondAPIContent(request, response, 405, new errors.RequestMethodError());
  }
};

// Contains endpoints
const urlResponses = {
  '/pool': respondPoolPage,
  '/pool-delete': respondPoolDelete,
  '/pool-clear': respondPoolClear,
};

module.exports = urlResponses;
