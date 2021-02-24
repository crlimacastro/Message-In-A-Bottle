const query = require('querystring');

// Utils
const fileUtils = require('../utils/fileUtils.js');
const serverUtils = require('../utils/serverUtils.js');

const { MIMETYPES } = serverUtils;
const { File } = fileUtils;

const msgPool = require('../msgPool.js');

// Errors
const APIError = require('../utils/apiUtils.js');
const RequestMethodError = require('./errors/RequestMethodError.js');
const TextUndefinedError = require('./errors/TextUndefinedError.js');

// JSON Responses
const MsgCreatedResponse = require('./json/MsgCreatedResponse.js');

// Functionality
const pushMsg = (text) => msgPool.push(text);

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
      const file = new File(content, type);
      serverUtils.respond(request, response, 400, file);
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      if (!bodyParams.text) {
        const content = JSON.stringify(new TextUndefinedError());
        const type = MIMETYPES.JSON;
        const file = new File(content, type);
        serverUtils.respond(request, response, 400, file);
      } else {
        pushMsg(bodyParams.text);

        const content = JSON.stringify(new MsgCreatedResponse());
        const type = MIMETYPES.JSON;
        const file = new File(content, type);
        serverUtils.respond(request, response, 201, file);
      }
    });
  } else {
    const content = JSON.stringify(new RequestMethodError());
    const type = MIMETYPES.JSON;
    const file = new File(content, type);
    serverUtils.respond(request, response, 405, file); // 405 - Method Not Allowed
  }
};

// Contains endpoints
const urlResponses = {
  '/write-msg': respondPushMsg,
};

module.exports = urlResponses;
