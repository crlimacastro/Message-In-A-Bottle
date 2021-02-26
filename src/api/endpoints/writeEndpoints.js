// Utils
const serverUtils = require('../../utils/serverUtils');
const apiUtils = require('../../utils/apiUtils');

const errors = require('../errors');
const jsonResponses = require('../jsonResponses');

const poolsHandler = require('../poolsHandler.js');

// Functionality
const pushMsg = (message, topic = null) => poolsHandler.push(message, topic);

// Responses
const respondWriteMsg = (request, response) => {
  if (request.method === 'POST') {
    // POST Request Body
    const body = [];

    // Callbacks
    request.on('error', (err) => apiUtils.respondAPIContent(request, response, 400,
      new apiUtils.APIError(null, err, null)));

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyParams = serverUtils.getBodyParams(body);

      if (!bodyParams.message) {
        // 400 - Bad Request
        return apiUtils.respondAPIContent(request, response, 400, new errors.ParamUndefinedError());
      }
      pushMsg(bodyParams.message, bodyParams.topic);

      // 201 - Created
      return apiUtils.respondAPIContent(request, response, 201,
        new jsonResponses.MsgCreatedResponse());
    });
  } else {
    return apiUtils.respondAPIContent(request, response, 405, new errors.RequestMethodError());
  }

  return response;
};

// Contains endpoints
const urlResponses = {
  '/write-msg': respondWriteMsg,
};

module.exports = urlResponses;
