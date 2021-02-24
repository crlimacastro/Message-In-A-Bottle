// Utils
const fileUtils = require('../utils/fileUtils.js');
const serverUtils = require('../utils/serverUtils.js');
const xmlUtils = require('../utils/xmlUtils.js');

const { MIMETYPES } = serverUtils;
const { File } = fileUtils;

const msgPool = require('../msgPool.js');

// Functionality
const getPoolSlice = (limit, offset) => msgPool.peek(limit, offset);

// Responses
const respondPoolSlice = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const params = serverUtils.getParams(request);

  let content = getPoolSlice(params.limit, params.offset);
  let type;
  if (acceptedTypes.includes(MIMETYPES.XML)) {
    content = xmlUtils.parseJSONToXML(content);
    type = MIMETYPES.XML;
  } else {
    content = JSON.stringify(content);
    type = MIMETYPES.JSON;
  }
  const file = new File(content, type);
  return serverUtils.respond(request, response, 200, file);
};

// Contains endpoints
const urlResponses = {
  '/msg-pool': respondPoolSlice,
};

module.exports = urlResponses;
