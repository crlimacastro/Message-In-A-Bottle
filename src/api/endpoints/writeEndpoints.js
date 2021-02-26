// Utils
const fileUtils = require('../../utils/fileUtils');
const serverUtils = require('../../utils/serverUtils');

const dataHandler = require('../../dataHandler.js');

const { ResponseFile } = fileUtils;
const { MIMETYPES } = serverUtils;

// Errors
const APIError = require('../../utils/apiUtils');
const RequestMethodError = require('../errors/RequestMethodError.js');
const ParamUndefinedError = require('../errors/ParamUndefinedError.js');

// API Responses
const MsgCreatedResponse = require('../jsonResponses/MsgCreatedResponse.js');

// Functionality
const pushMsg = (message, topic = null) => dataHandler.push(message, topic);

// Responses
const respondPushMsg = (request, response) => {
  if (request.method === 'POST') {
    // POST Request Body
    const body = [];

    // Callbacks
    request.on('error', (err) => {
      // Respond with unidentified error
      const content = JSON.stringify(new APIError(null, err, null));
      const type = MIMETYPES.JSON;
      const file = new ResponseFile(content, type);
      serverUtils.respond(request, response, 400, file); // 400 - Bad Request
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyParams = serverUtils.getBodyParams(body);

      if (!bodyParams.message) {
        const content = JSON.stringify(new ParamUndefinedError());
        const type = MIMETYPES.JSON;
        const file = new ResponseFile(content, type);
        serverUtils.respond(request, response, 400, file); // 400 - Bad Request
      } else {
        pushMsg(bodyParams.message, bodyParams.topic);

        const content = JSON.stringify(new MsgCreatedResponse());
        const type = MIMETYPES.JSON;
        const file = new ResponseFile(content, type);
        serverUtils.respond(request, response, 201, file); // 201 - Created
      }
    });
  } else {
    const content = JSON.stringify(new RequestMethodError());
    const type = MIMETYPES.JSON;
    const file = new ResponseFile(content, type);
    serverUtils.respond(request, response, 405, file); // 405 - Method Not Allowed
  }
};

// Contains endpoints
const urlResponses = {
  '/write-msg': respondPushMsg,
};

module.exports = urlResponses;
