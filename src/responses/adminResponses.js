// Utils
const fileUtils = require('../utils/fileUtils.js');
const serverUtils = require('../utils/serverUtils.js');
const xmlUtils = require('../utils/xmlUtils.js');
const mathUtils = require('../utils/mathUtils.js');

const { MIMETYPES } = serverUtils;
const { File } = fileUtils;

const dataHandler = require('../dataHandler.js');

// API Responses
const PoolPage = require('./api/PoolPage.js');

// Errors
const ParamUndefinedError = require('./errors/ParamUndefinedError.js');

// Functionality
const getPoolPage = (limit, page) => {
  // Clean limit
  let lim = Number(limit); // cast limit to a number
  lim = mathUtils.clamp(lim, 1, dataHandler.count()); // clamp between 1 and array length
  lim = Math.floor(lim); // make sure it is an integer

  const totalPages = Math.ceil(dataHandler.count() / lim); // Get total amount of pages

  // Clean page
  let pg = Number(page); // cast page to a number
  pg = mathUtils.clamp(pg, 0, totalPages - 1); // clamp between 0 and page total
  pg = Math.floor(pg); // make sure it is an integer

  const offset = lim * pg; // Get peek offset
  const messages = dataHandler.peek(lim, offset); // Get slice of messages
  const pageObj = new PoolPage(messages, totalPages, pg); // Make page obj
  return pageObj;
};

// Responses
const respondPoolPage = (request, response) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  const params = serverUtils.getParams(request);

  if (!params.limit || !params.page) {
    const content = JSON.stringify(new ParamUndefinedError());
    const type = MIMETYPES.JSON;
    const file = new File(content, type);
    return serverUtils.respond(request, response, 400, file); // 400 - Bad Request
  }

  let content = getPoolPage(params.limit, params.page);
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
  '/pool': respondPoolPage,
};

module.exports = urlResponses;
